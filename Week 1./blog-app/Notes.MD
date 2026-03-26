# BUILDING A SIMPLE BLOG UI.

## Folder structure
---

## Top-level overview

```
my-app/
├── public/                  # Static files served as-is (favicon, index.html)
├── src/                     # All your application code lives here
├── .env                     # Environment variables (local)
├── .env.production          # Environment variables (production build)
├── .eslintrc.js             # Linting rules
├── .prettierrc              # Code formatting rules
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Build tool configuration (or next.config.js)
└── package.json             # Dependencies and scripts
```

---

## Inside `src/`

```
src/
├── main.tsx                 # App entry point — mounts React to the DOM
├── App.tsx                  # Root component — sets up routing and providers
├── vite-env.d.ts            # TypeScript type definitions for Vite
│
├── features/                #  Core business logic, split by domain
├── components/              # Shared, reusable UI components
├── hooks/                   # Shared, reusable custom hooks
├── pages/                   # Top-level route pages
├── routes/                  # Route definitions and guards
├── store/                   # Global state (Zustand / Redux)
├── lib/                     # Third-party client setup (axios, supabase, etc.)
├── utils/                   # Pure helper functions
├── types/                   # Global TypeScript types and interfaces
├── constants/               # App-wide constants and enums
├── assets/                  # Images, fonts, SVGs
└── styles/                  # Global CSS, Tailwind config, design tokens
```

---

## `features/` — the heart of the app

Each feature is a **self-contained module** that owns everything it needs.
No feature should reach into another feature's internals.

```
src/features/
├── auth/
├── dashboard/
├── settings/
└── payments/
```

### Inside a single feature (e.g. `auth/`)

```
src/features/auth/
├── index.ts                 # Public barrel — the only import point for other modules
├── components/              # UI components used only within this feature
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── AuthGuard.tsx
├── hooks/                   # Hooks scoped to this feature
│   ├── useAuth.ts
│   └── useSession.ts
├── api.ts                   # All API calls for this feature
├── store.ts                 # Local state slice (Zustand / Redux)
├── types.ts                 # TypeScript types for this feature
├── utils.ts                 # Helper functions (token parsing, validation)
└── constants.ts             # Feature-level constants (route paths, keys)
```

### The barrel file (`index.ts`)

The `index.ts` acts as the **public API** of the feature.
Other parts of the app should only import from here — never from deep internal paths.

```ts
// features/auth/index.ts
export { LoginForm }   from './components/LoginForm';
export { AuthGuard }   from './components/AuthGuard';
export { useAuth }     from './hooks/useAuth';
export type { User, AuthState } from './types';
```

```ts
// Correct — import from the barrel
import { useAuth, AuthGuard } from '@/features/auth';

//  Wrong — never import from deep paths
import { useAuth } from '@/features/auth/hooks/useAuth';
```

---

## `components/` — shared UI only

Only truly **generic, domain-agnostic** components live here.
If a component knows about "users" or "orders", it belongs in a feature instead.

```
src/components/
├── ui/                      # Primitives: Button, Input, Badge, Spinner
├── layout/                  # App shell: Navbar, Sidebar, Footer
└── feedback/                # Alerts, Toasts, Error boundaries
```

---

## `pages/` and `routes/`

```
src/pages/
├── HomePage.tsx
├── LoginPage.tsx
└── DashboardPage.tsx

src/routes/
├── index.tsx                # Root router setup
├── PrivateRoute.tsx         # Auth-protected route wrapper
└── routes.ts                # Route path constants
```

Pages are **thin** — they import from features and wire them together.
Heavy logic stays inside features, not in pages.

---

## `store/` — global state only

Only state that is **shared across multiple features** lives here.
Feature-specific state lives inside the feature's own `store.ts`.

```
src/store/
├── index.ts                 # Store setup and exports
├── userStore.ts             # Logged-in user, session
└── uiStore.ts               # Theme, sidebar open/close, modals
```

```ts
// Dashboard reads shared state from the global store
import { useUserStore } from '@/store/userStore';

//  Dashboard should never reach into another feature
import { useAuth } from '@/features/auth/hooks/useAuth';
```

---

## `lib/` and `utils/`

```
src/lib/
├── axios.ts                 # Configured Axios instance with interceptors
├── queryClient.ts           # React Query client setup
└── supabase.ts              # Supabase / Firebase client

src/utils/
├── formatDate.ts
├── formatCurrency.ts
└── cn.ts                    # Class name utility (e.g. clsx + tailwind-merge)
```

---

## `types/` and `constants/`

```
src/types/
├── api.ts                   # API response shapes
├── common.ts                # Shared types used across features
└── index.ts                 # Re-exports

src/constants/
├── routes.ts                # App route paths
├── queryKeys.ts             # React Query cache keys
└── config.ts                # Feature flags, app config values
```

---

## Quick reference: where does it go?

| What we're building | Where it lives |
|---|---|
| Login form, auth guard | `features/auth/components/` |
| Reusable Button, Modal | `components/ui/` |
| `useAuth` hook | `features/auth/hooks/` |
| `useDebounce` hook | `hooks/` |
| Auth API calls | `features/auth/api.ts` |
| Axios instance setup | `lib/axios.ts` |
| Logged-in user state | `store/userStore.ts` |
| Dashboard-only state | `features/dashboard/store.ts` |
| Global TypeScript types | `types/` |
| Feature-specific types | `features/[name]/types.ts` |


## BUILDING THE APP.

### Setiing up Dark Theme using Tailwind CSS.

-This is easily set up once Tailwind CSS is installed inside the project.

-It provides a 'dark' variant that enables one to add styles for the dark theme.

-In the file where we are importing tailwind css, add this line:

    @custom-variant dark (&:where(.dark, .dark *));

-This ensures the dark theme applies automatically whenever the 'dark' variant is used.

-This is when we use the 'dark' variant as a class.

-To add the toggle logic, where one clicks on a button and the theme switches from one to the other, this is the generic template for handling it:

    //hooks/useDarkMode.ts

    import { useEffect, useState } from 'react';

    type Theme = 'light' | 'dark';

    export function useDarkMode(): [Theme, () => void]{
        
        const [theme, setTheme] = useState<Theme>(() => {
            const saved = localStorage.getItem('theme') as Theme | null;
            return saved === 'dark' || saved === 'light' ? saved : 'light';
        });
        //this checks if there's a saved theme, otherwise default to light


       useEffect(() => {
        const root = window.document.documentElement;

        if(theme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }

        //persist the choice
        localStorage.setItem('theme', theme);
       }, [theme]);

        const toggleTheme = () => {
            setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        };

        return [theme, toggleTheme];
    }

-How would we use this hook in our component?

    import { useDarkMode } from '//path to Dark Theme hook';

    const ThemeToggle: React.FC = () => {
        const [theme, toggleTheme] = useDarkMode();

        return (
            <button
            onClick={toggleTheme}
            className='styles here'>

            {theme === 'light' ? 'moon icon' : 'sun icon'}

            </button>
        );
    };

