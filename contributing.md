# Vanadiel Time

This project contains a TypeScript library for calculating and displaying Vana'diel time from Final Fantasy XI, with Vue 3 components.

## Project Structure

```
vanadiel-time/
├── dist/                 # Compiled output (generated on build)
├── src/
│   ├── utils/            # Utility functions
│   │   ├── VanaTimeCalculator.ts
│   │   ├── VanaTimeCalculator.test.ts
│   │   └── helpers.ts
│   └── index.ts          # Main entry point
├── .gitignore
├── LICENSE
├── package.json
├── README.md
├── rollup.config.js
└── tsconfig.json
```

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development:
   ```bash
   npm run build
   ```

## File Descriptions

- **src/index.ts**: Main entry point that exports all components and utilities
- **src/utils/VanaTimeCalculator.ts**: Core calculator class for Vana'diel time
- **src/utils/helpers.ts**: Helper functions for time calculations
- **src/components/**: Vue 3 components for easy integration
- **package.json**: NPM package configuration
- **rollup.config.js**: Bundle configuration
- **tsconfig.json**: TypeScript configuration

## Publishing

To publish to NPM:

1. Update version in package.json
2. Build the package:
   ```bash
   npm run build
   ```
3. Test the package:
   ```bash
   npm test
   ```
4. Publish:
   ```bash
   npm publish
   ```

## License

MIT
