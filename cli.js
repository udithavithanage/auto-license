#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const readline = require("readline-sync");

// Allowed file extensions for license injection
const allowedExtensions = [
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".py",
  ".java",
  ".c",
  ".cpp",
  ".cs",
  ".go",
  ".rb",
  ".php",
  ".swift",
  ".rs",
  ".bal",
];

// Ask user for folder to watch
let folderToWatch = readline.question("Enter folder path to watch: ");
folderToWatch = path.resolve(folderToWatch);

// Ask user for license text
console.log(
  'Enter your license text (end with a single line with only "END"):'
);
let licenseLines = [];
while (true) {
  let line = readline.question();
  if (line.trim() === "END") break;
  licenseLines.push(line);
}
const licenseText = "/*\n" + licenseLines.join("\n") + "\n*/\n\n";

// Ensure folder exists
if (!fs.existsSync(folderToWatch)) {
  fs.mkdirSync(folderToWatch, { recursive: true });
  console.log(`Folder created: ${folderToWatch}`);
}

// Initialize watcher with ignores
const watcher = chokidar.watch(folderToWatch, {
  persistent: true,
  ignoreInitial: true,
  ignored: [
    /(^|[\/\\])\../, // ignore dotfiles (.git, .svn, .DS_Store, etc.)
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
  ],
});

watcher.on("add", (filePath) => {
  try {
    if (fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();

      // Skip files that aren't in our allowed list
      if (!allowedExtensions.includes(ext)) {
        console.log(
          `Skipping unsupported file: ${path.relative(folderToWatch, filePath)}`
        );
        return;
      }

      const content = fs.readFileSync(filePath, "utf8");

      // Check if license already exists
      if (!content.startsWith("/*")) {
        fs.writeFileSync(filePath, licenseText + content, "utf8");
        console.log(
          `✅ License added to ${path.relative(folderToWatch, filePath)}`
        );
      }
    }
  } catch (err) {
    console.error(`⚠️ Skipping file: ${filePath} (${err.code})`);
  }
});

console.log(`👀 Watching folder: ${folderToWatch} ...`);
