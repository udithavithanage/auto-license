# auto-license

Automatically add license headers to new files in a specified folder.

## Description

Auto-License is a Node.js CLI tool that monitors a specified folder for new files and automatically prepends a user-defined license header to them. It uses `chokidar` for file watching and `readline-sync` for interactive user input, ensuring a seamless experience for adding license headers to new files.

## Installation

You can install Auto-License globally via npm to use it as a command-line tool:

```bash
npm install -g auto-license
```

Alternatively, you can install it locally in your project:

```bash
npm install auto-license
```

## Usage

1. Run the tool using the command:

```bash
auto-license
```

2. Enter the folder path you want to monitor for new files when prompted. The path will be resolved relative to your current working directory.

3. Input your license text. Type each line of the license, and when finished, type `END` on a new line to complete the input. The license text will be formatted as a JavaScript-style comment block (`/* ... */`).

4. The tool will create the folder if it doesn't exist and start watching for new files. When a new file is added, the license header will be automatically prepended, unless the file already starts with a comment block (`/*`).

### Example

```bash
$ auto-license
Enter folder path to watch: ./src
Enter your license text (end with a single line with only "END"):
MIT License
Copyright (c) 2025 Your Name
END
Watching folder: /path/to/src ...
```

If a new file `example.js` is created in the `./src` folder, the tool will add the license header:

```javascript
/*
MIT License
Copyright (c) 2025 Your Name
*/

[original file content]
```

## Features

- **Interactive CLI**: Prompts for folder path and license text.
- **Automatic License Addition**: Adds license headers to new files in the watched folder.
- **Folder Creation**: Automatically creates the specified folder if it doesn't exist.
- **File Monitoring**: Uses `chokidar` to efficiently watch for new files.
- **Skips Existing Licenses**: Avoids adding a license header if the file already starts with a comment block.

## Requirements

- Node.js (version 12 or higher)
- npm (usually included with Node.js)

## Dependencies

- [chokidar](https://www.npmjs.com/package/chokidar): ^3.6.0 - For watching file system changes.
- [readline-sync](https://www.npmjs.com/package/readline-sync): ^1.4.10 - For synchronous user input in the CLI.

## Scripts

There are no additional scripts defined in this package. Simply run `auto-license` to start the tool.

## Keywords

- license
- header
- automation
- file-watcher
- cli
- auto-license

## Author

Uditha Vithanage

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on the [GitHub repository](https://github.com/udithavithanage/auto-license.git).

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/udithavithanage/auto-license.git).
