# AI Coding Rules and Project Guidelines

This document outlines the technical stack and coding conventions for this application to ensure consistency, maintainability, and adherence to best practices.

## Tech Stack Overview

*   **Framework:** React
*   **Language:** TypeScript
*   **Routing:** React Router
*   **Styling:** Tailwind CSS (Utility-first approach)
*   **Component Library:** shadcn/ui (Built on Radix UI)
*   **Icons:** `lucide-react`
*   **Project Structure:** Source code resides in `src/`. Pages are in `src/pages/`, and reusable components are in `src/components/`.
*   **State Management:** Simple React state management (e.g., `useState`, `useReducer`, Context API) is preferred unless complexity dictates otherwise.

## Library Usage Rules

| Area | Preferred Library/Tool | Notes |
| :--- | :--- | :--- |
| **UI Components** | `shadcn/ui` / Radix UI | Always use pre-built shadcn/ui components when available. If a component needs modification, create a new component file that wraps or extends the base component. |
| **Styling** | Tailwind CSS | Use utility classes exclusively. Avoid custom CSS files unless absolutely necessary for complex, non-utility-based styles. |
| **Icons** | `lucide-react` | All icons must be sourced from this library. |
| **Routing** | React Router | Use for all client-side navigation and route definitions (typically defined in `src/App.tsx`). |
| **Notifications** | `react-hot-toast` (if installed) | Use for all user feedback (success, error, loading messages). |
| **Data Fetching** | Standard React/TypeScript patterns | Use `fetch` or a lightweight wrapper (like Axios, if installed) for API interactions. |

## General Coding Guidelines

1.  **File Structure:**
    *   New components must be placed in `src/components/`.
    *   New pages must be placed in `src/pages/`.
    *   Directory names must be all lower-case.
2.  **Component Size:** Components should be small and focused (ideally under 100 lines of code). Refactor large components into smaller, reusable pieces.
3.  **Responsiveness:** All designs must be responsive, utilizing Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`).
4.  **Simplicity:** Prioritize simple, elegant solutions. Avoid over-engineering, complex state management, or unnecessary abstractions unless the application's complexity demands it.
5.  **Error Handling:** Do not implement `try/catch` blocks unless specifically requested. Errors should be allowed to bubble up for debugging and centralized handling.