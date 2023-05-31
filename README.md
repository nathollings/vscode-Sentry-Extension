# Sentry Tracking for VSCode

Sentry Tracking is a Visual Studio Code extension that allows you to monitor your Sentry issues directly from your editor. It fetches and displays Sentry issues for your selected projects and environments.

## Features

- Fetch and display Sentry issues in VSCode.
- Filter by selected projects and environments.
- Access issue details with a single click.

## Getting Started

1. Install the extension by searching for "Sentry Tracking" in the VSCode extensions marketplace.
2. After installation, you will need to configure the extension settings:

   - `sentry-tracking.url`: The URL for your Sentry instance.
   - `sentry-tracking.token`: Your Sentry API token.
   - `sentry-tracking.secret`: Your Sentry API secret (optional).
   - `sentry-tracking.organisationSlug`: Your Sentry organization slug.

   To set these, go to the VSCode settings (File > Preferences > Settings), search for "Sentry Tracking", and fill in the fields.

3. Once configured, the Sentry Tracking sidebar should be available in your activity bar. Click on it to view your Sentry issues.

## Development

If you want to contribute to this extension, you'll need Node.js and npm installed on your machine.

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Open the project in VSCode.
4. Press `F5` to start the debugger and open a new VSCode window with the extension activated.

## Scripts

- `npm run compile`: Compile the TypeScript code.
- `npm run watch`: Watch for changes and recompile.
- `npm run lint`: Run the linter.
- `npm run test`: Run the tests.

## Contributing

Contributions are welcome! Please read our [contributing guide](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.
