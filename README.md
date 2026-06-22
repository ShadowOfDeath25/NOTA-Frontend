# Nota — AI-Powered Collaborative Note-Taking Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Nota** (نوتة) is a bilingual (Arabic/English), AI-powered collaborative note-taking application. It features real-time rich-text editing via Yjs/CRDT synchronization, PDF import with text extraction, AI summarization, collaborative Spaces (workspaces), and full bidirectional RTL/LTR support — all built with React 19, TypeScript, and Vite 8.

## Overview

Nota replaces the default Vite + React starter template with a production-grade note-taking platform. It is designed for individuals and teams who need a modern, responsive, and real-time collaborative writing environment.

**Main use cases:**

- Take and organize personal rich-text notes
- Collaborate on documents with multiple users in real time
- Import PDFs and extract text for further editing
- Summarize notes and pasted text with AI
- Organize work into Spaces with role-based access (owner, admin, editor, viewer)
- Work seamlessly in both Arabic and English with full RTL support

**Key benefits:**

- **Real-time collaboration** — CRDT-based synchronization via Yjs + Hocuspocus
- **Bilingual by design** — Full Arabic translation, dynamic text direction, Cairo Arabic font
- **AI-powered** — Built-in summarization endpoint and UI
- **PDF import** — Drag-and-drop PDF ingestion with progress feedback
- **Offline-ready** — y-indexeddb for Yjs document persistence (available in dependencies)
- **Modern stack** — React 19, Vite 8, TypeScript 6, TanStack Query 5, Quill 2

## Features

- **Rich-text editor** — Quill 2 with full toolbar (headings, bold, italic, lists, code blocks, blockquotes, text alignment, font size/color, highlight)
- **Real-time collaboration** — Yjs document sync over WebSocket, live cursors via quill-cursors, active user awareness
- **AI summarization** — Summarize notes or arbitrary text from a dedicated page or inline from the editor
- **PDF import** — Drag-and-drop or file browser upload, text extraction, and progressive import status
- **Spaces** — Collaborative workspaces with member management, role-based access (owner/admin/editor/viewer), invite links
- **Bidirectional language support** — Full Arabic translation (391 keys), automatic `dir` and `lang` attribute switching, Cairo font for Arabic text
- **Dark/Light theme** — System-preference-aware theme toggle persisted to localStorage
- **Trash management** — Soft-delete notes with restore and permanent deletion; 30-day auto-delete notice
- **Notifications** — In-app notification system with real-time events via Laravel Echo + Reverb
- **Authentication** — Email/password registration and login, Google OAuth, password reset flow, CSRF protection
- **Form validation** — Zod schemas for auth forms with strong password rules
- **Search** — Sidebar note search and spaces page search
- **Responsive layout** — Collapsible sidebar, mobile-aware top bar, scroll-triggered landing page animations
- **Toast notifications** — Queue-based snackbar system with success/error/warning/info variants

## Tech Stack

### Languages & Runtimes

| Layer | Technology |
|-------|-----------|
| Frontend | TypeScript 6, React 19 |
| Build | Vite 8, esbuild (bundler), Oxc/SWC (transformer) |
| Backend (required) | Laravel (REST API) |

### Core Libraries

| Category | Libraries |
|----------|-----------|
| **Routing** | react-router-dom 7 (createBrowserRouter) |
| **Data Fetching** | @tanstack/react-query 5, axios 1 |
| **Rich Text** | quill 2, quill-cursors 4 |
| **Collaboration** | yjs 13, @hocuspocus/provider 4, y-quill 1, y-indexeddb 9 |
| **Real-time Events** | laravel-echo 2, pusher-js 8 |
| **Internationalization** | i18next 26, react-i18next 17 |
| **Validation** | zod 4 |
| **UI / Animation** | @mui/material 9, @emotion/react 11, framer-motion 12 |
| **Syntax Highlighting** | highlight.js 11 |
| **UUID** | uuid 14 |

### Dev & Quality

| Category | Tools |
|----------|-------|
| **Linting** | ESLint 9, typescript-eslint 8, eslint-plugin-react-hooks |
| **Vite Plugins** | @vitejs/plugin-react, vite-plugin-svgr, vite-tsconfig-paths |
| **Icons** | Custom SVG icons imported as React components via SVGR |

## Project Structure

```
nota-frontend/
├── .env.example               # Environment variable template
├── .github/workflows/         # CI/CD pipeline (deploy_to_aws.yml)
├── eslint.config.js           # ESLint flat config
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript project references
├── tsconfig.app.json          # App-specific TS config with path aliases
├── tsconfig.node.json         # Node/Vite config TS config
├── vite.config.ts             # Vite config with proxy, plugins
└── src/
    ├── main.tsx               # App entry — providers, router
    ├── router.tsx             # React Router configuration with guards
    ├── axiosClient.ts         # Axios instances (versioned + raw)
    ├── echo.ts                # Laravel Echo (Reverb/Pusher) setup
    ├── i18n.ts                # i18next initialization
    ├── queryClient.ts         # TanStack Query client
    ├── index.css              # Global styles, CSS variables, theming
    ├── assets/                # SVG icons, Cairo font, logo
    ├── components/            # Reusable UI components
    │   ├── Editor/            # Quill editor + toolbar + modals
    │   ├── Sidebar/           # Navigation sidebar
    │   ├── TopBar/            # Top header bar
    │   ├── Spaces/            # Space cards, modals, detail tabs
    │   ├── Authentication/    # Login/signup/reset forms
    │   ├── Home/              # Welcome header, action cards, note cards
    │   ├── Notifications/     # Notification list and items
    │   ├── Settings/          # Settings page panel
    │   ├── Trash/             # Trash list and cards
    │   ├── Snackbar/          # Toast notification system
    │   ├── ImportModal/       # PDF import with drag-and-drop
    │   ├── LanguageSync/      # Synchronizes i18n with HTML attributes
    │   └── Landing/           # Marketing page sections
    ├── context/
    │   ├── ModalContext.tsx    # Global modal state management
    │   └── SettingsContext.tsx # Theme + language state
    ├── guards/
    │   ├── Authenticated.tsx  # Redirects to /login if unauthenticated
    │   └── Guest.tsx          # Redirects to /home if authenticated
    ├── hooks/
    │   ├── api/               # TanStack Query hooks for each endpoint
    │   ├── useCollaboration.ts# Yjs + Hocuspocus + Quill binding
    │   ├── useAwareness.ts    # Active user tracking
    │   ├── useFileHandler.ts  # File drop/select/validation
    │   ├── useImportProgress.ts# Simulated import progress
    │   ├── useToolbarFormats.ts# Toolbar state sync
    │   └── useInView.ts       # IntersectionObserver for animations
    ├── layouts/
    │   ├── MainLayout/        # Authenticated app shell
    │   ├── GuestLayout/       # Auth pages shell
    │   └── LandingLayout/     # Marketing page shell
    ├── pages/
    │   ├── HomePage/          # /home
    │   ├── NotePage/          # /notes/:noteId (editor)
    │   ├── AllNotesPage/      # /notes
    │   ├── SpacesPage/        # /spaces
    │   ├── SpaceDetailPage/   # /spaces/:spaceId
    │   ├── SpaceSettingsPage/ # /spaces/:spaceId/settings
    │   ├── SummarizePage/     # /summarize
    │   ├── SettingsPage/      # /settings
    │   ├── TrashPage/         # /trash
    │   ├── LandingPage/       # / (marketing)
    │   ├── auth/              # /login, /signup, /forgot-password, etc.
    │   ├── JoinPage/          # /join/:token (invite acceptance)
    │   └── NotFoundPage/      # 404
    ├── routes/
    │   ├── app.tsx            # Authenticated routes
    │   ├── auth.tsx           # Auth routes
    │   └── landing.tsx        # Landing routes
    ├── translation/
    │   └── ar.json            # Full Arabic translation dictionary
    ├── types/                 # TypeScript type definitions
    ├── utils/
    │   ├── isRTL.ts           # Arabic character detection
    │   └── space.ts           # Deterministic gradient assignment
    └── validation/
        └── auth.schema.ts     # Zod schemas for auth forms
```

## Installation

### Prerequisites

- **Node.js** ≥ 18 (tested with Node 20+)
- **npm** ≥ 9 (or pnpm / yarn)
- A running instance of the [NOTA Laravel backend](https://github.com/your-org/nota-backend) (for API, WebSockets, and Reverb)

### Clone

```bash
git clone https://github.com/your-org/nota-frontend.git
cd nota-frontend
```

### Install dependencies

```bash
npm install
```

### Environment setup

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Laravel API base URL | `http://localhost:8000` |
| `VITE_WS_PROVIDER_URL` | Hocuspocus WebSocket provider URL | `ws://localhost:1234` |
| `VITE_REVERB_HOST` | Laravel Reverb host | `localhost` |
| `VITE_REVERB_PORT` | Laravel Reverb port | `8080` |
| `VITE_REVERB_APP_KEY` | Reverb application key | _(required)_ |

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies:
- `/api` → `VITE_API_BASE_URL` (Laravel backend)
- `/ws` → `VITE_WS_PROVIDER_URL` (Hocuspocus WebSocket)
- `/broadcasting` → `VITE_API_BASE_URL` (Laravel Echo / Reverb)

## Configuration

### Environment Variables

All configuration is done through environment variables prefixed with `VITE_` (exposed to the client by Vite):

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Yes | Backend API URL (e.g., `https://api.nota.example.com`) |
| `VITE_WS_PROVIDER_URL` | Yes | Hocuspocus WebSocket URL (e.g., `wss://collab.nota.example.com`) |
| `VITE_REVERB_HOST` | Yes | Reverb WebSocket host |
| `VITE_REVERB_PORT` | Yes | Reverb WebSocket port |
| `VITE_REVERB_APP_KEY` | Yes | Reverb application key |

### Theming

Themes are controlled by the `data-theme` attribute on `<html>`:
- `dark` (default)
- `light`

Toggle via the Settings page or by calling the `SettingsContext` toggle function. The preference is persisted to `localStorage`.

### Language

The active language is stored in `localStorage` under the key `lang`. Supported values:
- `"en"` — English (default)
- `"ar"` — Arabic (full translation, RTL layout)

## Usage

### Quick Start

1. **Register / Login** — Navigate to `/signup` or `/login`. You can also sign in with Google OAuth.
2. **Create a note** — From the home page, click "Create Note" or use the sidebar button.
3. **Edit your note** — Use the Quill toolbar for rich formatting. Changes are saved automatically.
4. **Collaborate** — Share a note with other users via the Share button in the editor toolbar.
5. **Organize into Spaces** — Create a Space from the Spaces page, then move notes into it.
6. **Summarize with AI** — Open the Summarize page or click "AI Summarize" in the editor toolbar.

### Common Workflows

**Move a note to a Space:**
1. Open the note you want to move.
2. Click the options menu (three dots) in the editor toolbar.
3. Select "Move to Space" and choose the target space.

**Import a PDF:**
1. Click "Import PDF" on the home page or use the sidebar action.
2. Drag a PDF file onto the modal or click to browse (max 100 MB).
3. Wait for the import to complete — the extracted text will open in the editor.

**Invite a member to a Space:**
1. Navigate to the Space detail page.
2. Go to the Members tab.
3. Click "Invite Member" and enter their email, or generate an invite link to share.

### Commands

```bash
npm run dev       # Start Vite development server
npm run build     # Type-check with tsc and build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint across the project
```

## API Documentation

The frontend communicates with a Laravel REST API via Axios. Below are the key endpoint groups consumed by the application:

### Authentication (`/api`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/csrf-cookie` | GET | Set CSRF cookie (required before auth requests) |
| `/login` | POST | Email/password login |
| `/register` | POST | User registration |
| `/api/v1/user` | GET | Get authenticated user |
| `/logout` | POST | Logout |

### Notes (`/api/v1/notes`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/notes` | GET | List all notes |
| `/notes/{id}` | GET | Get single note |
| `/notes` | POST | Create a new note |
| `/notes/{id}` | PUT | Update a note (title, content, space_id) |
| `/notes/{id}` | DELETE | Soft-delete a note |
| `/notes/{id}/summarize` | POST | Trigger AI summarization |
| `/notes/read-pdf` | POST | Upload and extract text from a PDF |

### Spaces (`/api/v1/spaces`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/spaces` | GET | List user's spaces |
| `/spaces` | POST | Create a new space |
| `/spaces/{id}` | GET | Get space details |
| `/spaces/{id}` | PUT | Update space (name, description) |
| `/spaces/{id}` | DELETE | Delete space (owner only) |
| `/spaces/{id}/notes` | GET | List notes in a space |
| `/spaces/{id}/users` | GET | List members of a space |
| `/spaces/{id}/users/{userId}` | PUT | Update member role |
| `/spaces/{id}/users/{userId}` | DELETE | Remove member from space |

### Users (`/api/v1/users`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/users/{id}` | PUT | Update user settings (theme, language, notifications, 2FA) |

### Real-Time Events (Laravel Echo / Reverb)

| Event | Description |
|-------|-------------|
| `.note.summarized` | AI summary generation completed |
| `.note.summarization_failed` | AI summary generation failed |

## Development

### Local Setup

1. Ensure the Laravel backend, Hocuspocus WebSocket server, and Reverb are running locally.
2. Copy `.env.example` to `.env` and adjust values as needed.
3. Run `npm install` and `npm run dev`.

### Testing

The project does not currently include a test suite. Tests should be added following the contributors' guidelines.

### Linting

```bash
npm run lint
```

ESLint is configured with:
- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` recommended rules
- `eslint-plugin-react-refresh` (Vite-compatible)

To enable type-aware lint rules, update `eslint.config.js` following the comments in the file.

### Formatting

No automatic formatter (Prettier) is configured. Contributions should maintain consistent code style with the existing codebase.

### Build

```bash
npm run build
```

This runs `tsc -b` (TypeScript project build) followed by `vite build`. Output is written to `dist/`.

## Deployment

### Build Artifacts

The production build outputs static assets to `dist/`. Serve these with any static file server (Nginx, Apache, Caddy, S3 + CloudFront, etc.).

### GitHub Actions (AWS EC2)

A deployment workflow is included at `.github/workflows/deploy_to_aws.yml`. On each push to `main`, it:

1. Connects to an EC2 instance via SSH.
2. Pulls the latest code.
3. Installs dependencies and builds.
4. Copies `dist/` contents to the web root (`/var/www/nota-frontend/`).
5. Restarts Nginx.

**Required GitHub Secrets:**

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | EC2 instance public IP or hostname |
| `EC2_USERNAME` | SSH username (e.g., `ubuntu`) |
| `EC2_SSH_KEY` | SSH private key for authentication |

### Production Considerations

- Set `VITE_API_BASE_URL` and `VITE_WS_PROVIDER_URL` to the production URLs.
- Enable HTTPS for both the API and WebSocket endpoints.
- Configure Nginx (or your web server) to serve the SPA with proper fallback routing (all paths → `index.html`).
- Set appropriate `Cache-Control` headers for hashed assets in `dist/assets/`.
- Consider enabling gzip/brotli compression for static assets.

## Troubleshooting

| Issue | Cause / Solution |
|-------|------------------|
| `401 Unauthorized` on API calls | User session expired. Re-login to refresh the CSRF cookie and session. |
| WebSocket connection fails | Ensure the `VITE_WS_PROVIDER_URL` is correct and the Hocuspocus server is running. |
| `403 Forbidden` on space actions | Your role in the space does not permit the action. Contact the space owner. |
| PDF import stuck at "Analyzing pages" | File may be too large (>100 MB) or corrupt. Try a smaller/valid PDF. |
| Arabic text displays incorrectly | The Cairo font may not have loaded. Check browser console for font-load errors. |
| Editor toolbar buttons show wrong state | Selection may be collapsed. Click into the editor text and try again. |

## Security

- **CSRF protection** — All state-changing requests require a CSRF token obtained from `/csrf-cookie` before login/signup.
- **Sanctum-based authentication** — The Laravel backend uses Laravel Sanctum for SPA cookie-based authentication.
- **Secrets management** — Never commit `.env` files. All secrets (`VITE_REVERB_APP_KEY`, API keys, SSH keys) should be stored in environment variables or a secrets manager.
- **Password policy** — Zod validation enforces minimum 8 characters with lowercase, uppercase, digit, and special character.
- **XSS** — Quill's content is stored as Delta (structured JSON), not raw HTML, reducing XSS risk. Output is sanitized by the editor.
- **HTTPS** — Always use HTTPS in production for both the API and WebSocket connections.

### Secrets Management Recommendations

1. Keep `VITE_REVERB_APP_KEY` and any API tokens in environment variables, not in code.
2. Rotate SSH keys and Reverb app keys regularly.
3. Use GitHub Secrets (or your CI/CD platform's secrets) for deployment credentials.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Make your changes.
4. Run the linter: `npm run lint`.
5. Ensure the project builds successfully: `npm run build`.
6. Commit with a clear message describing the change.
7. Open a pull request against the `main` branch.

### Pull Request Process

- All PRs must pass the CI checks (lint, build).
- Include a description of what the PR does and why.
- For UI changes, include screenshots if applicable.
- Keep PRs focused on a single concern — avoid mixing unrelated changes.

### Project Conventions

- **Path aliases** — Use `@components/`, `@pages/`, `@hooks/`, `@utils/`, `@types/`, `@routes/`, `@guards/`, `@context/`, `@translation/`, `@assets/`, `@validators/` (see `tsconfig.app.json`).
- **Styling** — Use CSS Modules (`.module.css`) with CSS custom properties. Avoid inline styles.
- **Types** — Define and export TypeScript types in `src/types/`. Prefer interfaces for object shapes.
- **API hooks** — Place all TanStack Query hooks in `src/hooks/api/` using the generic `useCreate`, `useRead`, `useUpdate`, `useDelete` helpers where possible.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Built with React 19, TypeScript 6, Vite 8, Yjs, and Laravel.*
