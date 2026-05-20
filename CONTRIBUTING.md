# Contributing to VELA

Thank you for considering contributing to VELA — Gestão Inteligente para Clínicas de Estética! We welcome contributions from the community.

## How to Contribute

### Reporting Issues

Before submitting an issue, please check if it has already been reported. When submitting an issue, include:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior vs. actual behavior
- Screenshots or screen recordings if applicable
- Your environment (OS, browser, Node.js version, etc.)

### Suggesting Features

Feature requests are welcome! Please provide:

- A clear description of the feature
- Why it would be useful to VELA users
- Any potential implementation considerations
- Mockups or wireframes if available

### Pull Requests

1. **Fork the repository** and create your branch from `main` (or `master`).
2. **Set up your development environment** following the [Getting Started](#getting-started) guide in README.md.
3. **Make your changes** following our coding standards.
4. **Add or update tests** if applicable.
5. **Ensure your code passes linting**: `npm run lint`
6. **Commit your changes** using clear, descriptive commit messages.
7. **Push to your fork** and submit a pull request.

## Coding Standards

- Follow the existing code style in the repository
- Use TypeScript strict mode
- Write self-documenting code with meaningful variable and function names
- Prefer functional components and React hooks
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Follow Next.js 14 App Router conventions
- Keep components small and focused
- Add JSDoc comments for complex functions
- Ensure accessibility (a11y) considerations

### Commit Messages

We follow conventional commits format:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Build process or auxiliary tool changes

Example: `feat: add patient dashboard analytics`

## Development Process

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run linting: `npm run lint`
4. Test your changes thoroughly
5. Commit: `git commit -m "feat: amazing new feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Code Review

All pull requests require review from at least one maintainer. Please be responsive to feedback and ready to make changes if requested.

## Getting Help

If you need help, feel free to ask in the pull request comments or open an issue with the "question" label.

## License

By contributing to VELA, you agree that your contributions will be licensed under the MIT License.

Thank you for helping make VELA better!