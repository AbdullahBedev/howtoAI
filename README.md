# How-to-AI

A web application designed to empower everyday users to confidently harness artificial intelligence (AI) for practical tasks. With simple, step-by-step tutorials, an intuitive user journey, and a scalable business model, How-to-AI bridges the gap between powerful AI tools and the people who want to use them.

## Features

- **Step-by-Step Tutorials**: Bite-sized, interactive guides for real-world tasks (e.g., "Write a Blog Post with AI").
- **Task-Based Discovery**: Users search by goal (e.g., "create a logo"), not tool, making AI accessible.
- **Engaging Experience**: A clean, gamified platform that rewards progress and builds confidence.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable UI components
  - `ui/`: shadcn/ui components
  - `layout/`: Layout components (header, footer, etc.)
  - `tutorials/`: Tutorial-specific components
- `src/lib`: Utility functions and shared logic
- `src/store`: Zustand state management
- `src/types`: TypeScript type definitions

## Deployment

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## License

[MIT](https://choosealicense.com/licenses/mit/)
