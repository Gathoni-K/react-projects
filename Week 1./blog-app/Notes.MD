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

### Defining Styles for a Group.

-This is mostly useful when two or more elements share the same styles.

-The generic template for handling this would be:

    const styles = `
    <!-- styles go here -->

    <button className={styles}>
    //this is how they styles are used in the elements

    `

### Styling Cheat Codes:

1.Making an image round;

    rounded-full w-24 h-24
    //width and height should be the same number

2.

### Constant Styles in Components.

#### 1.NavBar.

    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-950/75 backdrop-blur-lg"
    >

    <div className="max-w-7xl m-auto px-4 h-16 flex items-center justify-between"
    >
    {/*logo and link actions go here*/}
    <div>

    </nav>

#### 2.Footer.


    const Footer: React.FC = () => {
        const currentYear = new Date().getFullYear();

        return(
            <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">

            <!-- main footer content -->
            <div className= "grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            <!-- Brand section -->
            <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4"> //logo here
            <span className="text-xl font-bold dark:text-white"> Brand Name</span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Building the next generation of web experiences with speed and precision
            </p>
            </div>

            <!-- link columns -->
            <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter/CTA */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 4. The Legal Strip */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Ripple Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
        </footer>
    );
    };

    export default Footer;

        
#### 3.Layout.

-File letting the navbar and footer be on every page of our website without importing the two components in every page.

    import NavBar from '//path to NavBar';
    import Footer from '//path to Footer';
    import type { ReactNode } from 'react';

    interface LayoutProps{
        children: ReactNode;
    }

    const Layout = ({children}: LayoutProps) => {
        return (
            <div>
            <NavBar />

            <main>
            {children}
            </main>

            <Footer />

            </div>
        )
    };

    export default Layout;

-Then in every page,

    import Layout from '//path to Layout';

    return (
        <Layout>
            //other components of the page go here
        </Layout>
    )

