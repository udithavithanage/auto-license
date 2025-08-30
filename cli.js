#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const readline = require("readline-sync");

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

// Initialize watcher
const watcher = chokidar.watch(folderToWatch, {
  persistent: true,
  ignoreInitial: true,
});

watcher.on("add", (filePath) => {
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, "utf8");

    // Check if license already exists
    if (!content.startsWith("/*")) {
      fs.writeFileSync(filePath, licenseText + content, "utf8");
      console.log(`License added to ${path.basename(filePath)}`);
    }
  }
});

console.log(`Watching folder: ${folderToWatch} ...`);
