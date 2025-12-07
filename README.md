# DrickSpel.com

This repository contains the source code for DrickSpel.com, a web application designed to host a collection of interactive drinking games. This document outlines the project's technical stack and local development setup.

## Technical Stack

The DrickSpel.com application is built upon a modern, performant, and scalable full-stack architecture:

- **Frontend Framework:** **TanStack Start** A robust framework for building Single Page Applications (SPAs). It provides advanced routing, data fetching mechanisms, and performance optimizations essential for a dynamic user interface. TanStack Start is chosen for its focus on developer experience and efficient client-side rendering.
- **Backend & Database (Live Games):** **Convex** Convex serves as the unified backend for all real-time, "live" game functionalities. It integrates serverless functions, a real-time database, and reactive queries, streamlining the development of interactive, collaborative experiences. Its type-safe API and real-time synchronization capabilities are crucial for the responsiveness of the live games.
- **Package Manager:** **pnpm** Utilized for efficient dependency management, leveraging a content-addressable store to save disk space and improve installation speeds.
- **Styling Philosophy:** The application incorporates a refined neobrutalism aesthetic. This approach emphasizes strong contrasts, clear typography, and a minimalist design to ensure functionality and user experience are paramount.

## Getting Started (Local Development)

This section details the necessary steps to set up and run the DrickSpel.com project in a local development environment.

### Prerequisites

Ensure the following tools are installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation)
- [Convex CLI](https://docs.convex.dev/cli) installed globally:
  ```bash
  pnpm install -g convex
  ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Hawaii66/drick.git
    cd drickspel-project
    ```
2.  **Install project dependencies:**
    ```bash
    pnpm install
    ```
3.  **Configure Convex integration:**
    - Access the [Convex dashboard](https://dashboard.convex.dev/) to create or select an existing Convex project.
    - Authenticate the Convex CLI with your account:
      ```bash
      npx convex auth login
      ```
    - Deploy your local Convex functions to link your project and initialize necessary environment variables. This action will create or update a `.env.local` file containing your `VITE_CONVEX_URL`.
      ```bash
      npx convex deploy
      ```
      Verify that `VITE_CONVEX_URL` is correctly configured in your `.env.local` file.

### Running the Development Servers

The project requires two separate development servers to be run concurrently: one for Convex (backend services) and one for TanStack Start (frontend application).

1.  **Start the Convex development server:**
    - This server monitors changes in your Convex functions and deploys them live to your Convex project.
    ```bash
    npx convex dev
    ```
2.  **Start the TanStack Start development server:**
    - Open a **new terminal window** and navigate to the project root.
    - This server compiles and serves the frontend application.
    ```bash
    pnpm run dev
    ```

Upon successful startup, the frontend application will be accessible via your web browser, typically at `http://localhost:3000`.
