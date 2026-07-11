#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

function usage(exitCode = 0) {
  console.log("Usage: node scripts/render_html.mjs <file.html|url> --output preview.png [--width 1440] [--height 1000] [--browser path]");
  process.exit(exitCode);
}

const args = process.argv.slice(2);
if (!args.length || args.includes("--help") || args.includes("-h")) usage(args.length ? 0 : 1);

const input = args[0];
const options = { width: 1440, height: 1000 };
for (let i = 1; i < args.length; i += 1) {
  const flag = args[i];
  const value = args[i + 1];
  if (["--output", "--width", "--height", "--browser"].includes(flag)) {
    if (!value) usage(1);
    options[flag.slice(2)] = value;
    i += 1;
  } else {
    console.error(`Unknown option: ${flag}`);
    usage(1);
  }
}

if (!options.output) {
  console.error("--output is required");
  usage(1);
}

const width = Number(options.width);
const height = Number(options.height);
if (!Number.isInteger(width) || !Number.isInteger(height) || width < 200 || height < 200) {
  console.error("--width and --height must be integers >= 200");
  process.exit(1);
}

function isExecutable(file) {
  try {
    return fs.statSync(file).isFile();
  } catch {
    return false;
  }
}

function commandOnPath(command) {
  const finder = process.platform === "win32" ? "where.exe" : "which";
  const result = spawnSync(finder, [command], { encoding: "utf8" });
  if (result.status !== 0) return null;
  return result.stdout.split(/\r?\n/).map((line) => line.trim()).find(Boolean) ?? null;
}

function findBrowser() {
  const explicit = options.browser || process.env.CHROME_PATH || process.env.EDGE_PATH;
  if (explicit && isExecutable(explicit)) return explicit;

  const candidates = process.platform === "win32"
    ? [
        `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\Google\\Chrome\\Application\\chrome.exe`,
        `${process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)"}\\Microsoft\\Edge\\Application\\msedge.exe`,
        `${process.env.LOCALAPPDATA ?? ""}\\Google\\Chrome\\Application\\chrome.exe`,
        `${process.env.PROGRAMFILES ?? "C:\\Program Files"}\\Microsoft\\Edge\\Application\\msedge.exe`,
      ]
    : process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
          "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ]
      : ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "microsoft-edge"]
          .map(commandOnPath)
          .filter(Boolean);

  return candidates.find(isExecutable) ?? null;
}

const browser = findBrowser();
if (!browser) {
  console.error("No Chromium-based browser found. Pass --browser or set CHROME_PATH.");
  process.exit(2);
}

const output = path.resolve(String(options.output));
fs.mkdirSync(path.dirname(output), { recursive: true });

let target;
if (/^https?:\/\//i.test(input)) {
  target = input;
} else {
  const html = path.resolve(input);
  if (!fs.existsSync(html)) {
    console.error(`Input does not exist: ${html}`);
    process.exit(1);
  }
  target = pathToFileURL(html).href;
}

const browserArgs = [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "--run-all-compositor-stages-before-draw",
  "--virtual-time-budget=3000",
  `--window-size=${width},${height}`,
  `--screenshot=${output}`,
  target,
];

const result = spawnSync(browser, browserArgs, { encoding: "utf8", timeout: 30000 });
if (result.status !== 0 || !fs.existsSync(output)) {
  console.error((result.stderr || result.stdout || "Browser screenshot failed").trim());
  process.exit(result.status || 1);
}

console.log(`Rendered ${target} -> ${output} (${width}x${height})`);
