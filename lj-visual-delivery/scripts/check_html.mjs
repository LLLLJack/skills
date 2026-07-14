#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const inputs = process.argv.slice(2);
if (inputs.length === 0 || inputs.includes("--help") || inputs.includes("-h")) {
  console.log("Usage: node scripts/check_html.mjs <file.html> [more.html]");
  process.exit(inputs.length === 0 ? 1 : 0);
}

let failures = 0;

for (const input of inputs) {
  const file = path.resolve(input);
  const label = path.relative(process.cwd(), file) || path.basename(file);
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(file)) {
    console.error(`FAIL ${label}: file does not exist`);
    failures += 1;
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  if (!/<html\b/i.test(html)) warnings.push("missing <html> element");
  if (!/<meta\s+[^>]*name=["']viewport["']/i.test(html)) {
    warnings.push("missing viewport meta tag");
  }

  const ids = new Map();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
    ids.set(match[1], (ids.get(match[1]) ?? 0) + 1);
  }
  const duplicates = [...ids.entries()].filter(([, count]) => count > 1);
  if (duplicates.length) {
    errors.push(`duplicate id(s): ${duplicates.map(([id, count]) => `${id}×${count}`).join(", ")}`);
  }

  const localRefs = [];
  for (const match of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
    const ref = match[1].trim();
    if (!ref || /^(?:[a-z]+:|\/\/|#|data:)/i.test(ref)) continue;
    const clean = decodeURIComponent(ref.split(/[?#]/, 1)[0]);
    if (!clean || clean.endsWith("/")) continue;
    localRefs.push(clean);
  }
  const missing = [...new Set(localRefs)].filter((ref) => !fs.existsSync(path.resolve(path.dirname(file), ref)));
  if (missing.length) errors.push(`missing local resource(s): ${missing.join(", ")}`);

  let scriptIndex = 0;
  const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scriptPattern)) {
    const attrs = match[1];
    const code = match[2];
    if (/\bsrc\s*=/i.test(attrs) || !code.trim()) continue;

    const type = attrs.match(/\btype\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const isModule = type === "module";
    if (type && !isModule && !["text/javascript", "application/javascript"].includes(type)) continue;

    scriptIndex += 1;
    const ext = isModule ? "mjs" : "js";
    const temp = path.join(os.tmpdir(), `lj-visual-delivery-${process.pid}-${scriptIndex}.${ext}`);
    try {
      fs.writeFileSync(temp, code, "utf8");
      const result = spawnSync(process.execPath, ["--check", temp], { encoding: "utf8" });
      if (result.status !== 0) {
        const detail = (result.stderr || result.stdout || "syntax error").trim();
        errors.push(`inline script ${scriptIndex} failed syntax check:\n${detail}`);
      }
    } finally {
      fs.rmSync(temp, { force: true });
    }
  }

  if (/echarts\.init\s*\(/.test(html) && !/(?:ResizeObserver|addEventListener\s*\(\s*["']resize)/.test(html)) {
    warnings.push("ECharts detected without an obvious resize handler");
  }

  if (errors.length) {
    failures += 1;
    console.error(`FAIL ${label}`);
    for (const error of errors) console.error(`  ERROR ${error}`);
  } else {
    console.log(`PASS ${label} (${scriptIndex} inline script${scriptIndex === 1 ? "" : "s"} checked)`);
  }
  for (const warning of warnings) console.warn(`  WARN  ${warning}`);
}

process.exit(failures ? 1 : 0);
