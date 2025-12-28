# Contributing to Portfolio

First off, thanks for taking the time to contribute! 

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull Request** so we can review your changes

## Prerequisites

- [Bun](https://bun.sh/) (v1.3.0+)
- [Node.js](https://nodejs.org/) (v18+)
- [Go](https://golang.org/) (v1.21+) - Required for addlicense tool

## Development Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Run the development server:

   ```bash
   bun run dev
   ```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run linter before committing:

  ```bash
  bun run lint
  ```

- Format your code:

  ```bash
  bun run format
  ```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, which includes new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any example files and the README.md to the new version that this Pull Request would represent.
4. You may merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Reporting Issues

When creating an issue, please include:

- A clear title and description
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT](LICENSE).
