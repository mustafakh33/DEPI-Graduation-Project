Exploring the frontend codebase to map structure, dashboards, state management, and duplication patterns for a refactoring plan.

Here is an architecture-focused read of DEPI-Graduation-Project/frontend and a refactor plan you can execute incrementally without rewriting the product in one shot.

Note on your last line
You wrote: «لو عايز أزبطهولك كمان بحيث:» — the sentence stops at “so that:”. If you tell me the rest (e.g. RTL, Arabic copy, performance, testing), I can fold those constraints into the same plan or adjust the target tree.

1. Project analysis
Current layout (simplified)
src/
  components/
    atoms/ molecules/ organisms/ templates/
    dashboard/          # PortalDashboardOverview, SharedRoleDashboard, navIcon
    organisms/Landing/
  context/auth/
  features/
    admin|auth|instructor|mentor|student/pages/
  guards/
  hooks/
  layouts/              # AdminLayout + *Layout wrappers
  pages/public/
  router/AppRouter.tsx
  store/hooks.ts        # Redux hooks commented out — unused
  styles/global.css
  types/
Stack: React 19, Vite 8, Tailwind 4 (@tailwindcss/vite), React Router 7, Radix Themes + Dialog, RHF + Zod, RTK + react-redux in package.json but not wired, @tanstack/react-table not used in src, class-variance-authority not used (no cva( matches).

What is working
Partial feature slicing: features/<role>/pages/* already groups role screens.
Atomic-ish UI: Sidebar, SidebarNavLink, LogoutButton, DashboardLayout for instructor/mentor/student.
Single overview widget: PortalDashboardOverview drives the “reference” dashboard UI for multiple roles.
Auth: AuthProvider + useAuth (context), guards for routes.
Problems (duplication, coupling, inconsistencies)
Area	Issue
Dashboard shell
AdminLayout.tsx reimplements the full app shell (sidebar, nav, sticky header, search, actions, user block, <Outlet />) instead of reusing DashboardLayout + Sidebar. Instructor/Mentor/Student already use one template; admin is a fork (~140 lines of duplicate structure and styling drift).
Dark-mode side effect
The same document.documentElement dark class logic exists in both AdminLayout and DashboardLayout — duplicated lifecycle and risk of conflicting behavior if one layout changes.
Logout + navigation
Every *Layout repeats handleLogout + navigate("/login"). Nav link arrays live in three layout files; admin links are inline in AdminLayout — no single “nav registry” per role.
Dashboard pages
features/*/pages/Dashboard.tsx: student/instructor/mentor only wrap SharedRoleDashboard; admin imports PortalDashboardOverview directly. SharedRoleDashboard is a thin pass-through — redundant indirection for three roles and inconsistent with admin.
Data / API
No fetch/axios usage in src yet — UI is mostly static. When APIs land, without a services/ layer you will get scattered calls and duplicated loading/error state inside pages.
Tables
Users.tsx (and similar) uses raw <table> + long Tailwind strings. @tanstack/react-table is installed but unused — missed reuse for sorting, pagination, column defs.
State management
Redux is a dead dependency (stub in store/hooks.ts). Either introduce it deliberately (e.g. RTK Query for server state) or remove to avoid confusion.
Design tokens
global.css @theme defines rich tokens; tailwind.config.js also extends colors and even references an external stitch_remix_... HTML path — fragile, non-portable, and splits token source of truth.
Imports
No @/ path alias in vite.config.ts — deep relative imports (../../../components/...) reduce refactor safety.
Tight coupling today
Router ↔ every page: AppRouter.tsx imports all screens at the top level — fine for small apps; at SaaS scale, prefer route modules (lazy + feature-owned route trees) to shrink bundle and boundaries.
Layouts ↔ auth: Direct useAuth in layouts is OK; better is a small useDashboardSession (or useLogout) in core/ so logout + redirect live in one place.
2. Target architecture (Clean + feature-first)
Clean Architecture in a SPA usually means dependency direction: UI → application (hooks/use-cases) → domain (types, rules) → infrastructure (HTTP). For your repo size, a pragmatic split is enough:

src/
  app/                          # composition root
    providers/                  # AppProviders, theme, store (if any)
    router/
      routes.tsx                # register route trees
      lazy-pages.ts             # optional: barrel of lazy imports
  core/                         # cross-cutting, no product features
    config/                     # env, feature flags
    constants/
    lib/                        # cn(), formatters, result types
    hooks/                      # useMediaQuery, useLogout, useDocumentTheme
    types/
  layouts/
    AppShellLayout.tsx          # ONE shell: sidebar + topbar + outlet
    PublicLayout.tsx            # landing, auth pages (optional)
  components/
    ui/                         # design system primitives (Button, Input, Card…)
  features/
    auth/
    admin/
    instructor/
    mentor/
    student/
    dashboard/                  # optional shared “home” widgets if not role-owned
  services/
    api/
      client.ts                 # base URL, headers, interceptors
      endpoints/                # or feature-scoped *Api.ts
  store/                        # only if you commit to Redux
Decisions:

app/ owns wiring (router, providers). No business rules.
core/ is generic; it must not import from features/*.
features/* owns pages, feature-specific components, hooks, and optional api.ts / types.ts colocated; shared domain types that cross features go to core/types or a bounded shared/ module.
components/ui is the design system; feature-specific composites stay under features/.../components.
3. Dashboard system (single reusable shell)
Goal: One layout component; roles differ only by nav config (and optional slots: header actions, breadcrumbs).

Suggested API:

AppShellLayout (rename from DashboardLayout for clarity) receives:
navItems: NavItem[] (from a role module)
portalSubtitle: string
basePath or dashboardPath (for NavLink end behavior — you already have this pattern in SidebarNavLink)
optional slots: headerActions?: ReactNode, sidebarFooter?: ReactNode
Admin stops being a special file: AdminLayout becomes ~15 lines — same as instructor/mentor/student — importing getAdminNav() from features/admin/config/navigation.ts.
Navigation registry (example shape):

// features/admin/config/navigation.ts
export const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  // ...
] as const;
Icon strategy: Pick one:

Keep Material Symbols strings in config and render <span className="material-symbols-outlined">{name}</span> inside a tiny NavIcon component, or
Standardize on lucide-react (already a dependency) and store LucideIcon in config for tree-shaking and consistency.
Remove duplication:

Delete duplicated markup from AdminLayout; use the same AppShellLayout as other roles.
Move forced dark mode to one place: core/hooks/useForceDashboardTheme.ts used only by AppShellLayout (or derive from user preference later).
4. Design system (components/ui)
You already have Radix + Tailwind + design tokens in global.css. Next steps:

Primitive	Implementation hint
Button
cva variants: variant (primary, secondary, ghost, danger), size.
Input
Native input + consistent ring; optional Radix for composition.
Card
Card, CardHeader, CardTitle, CardContent — map to your existing rounded/border classes.
Modal
Wrap @radix-ui/react-dialog once; pages only pass title, children, footer.
Table
DataTable wrapping TanStack Table + styled header/cell primitives.
Tokens: Consolidate on @theme in global.css (Tailwind v4 style) and trim tailwind.config.js — remove the stitch HTML path from content for production builds.

Spacing / typography: Use CSS variables you already define (--spacing-*) and map utilities or component padding to those names so marketing and dashboards align.

5. Reusability and DRY
Concern	Where
Logout + redirect
core/hooks/useLogout.ts
Role → home path
core/constants/routes.ts or reuse roleRedirects from router in one module imported by login + AppRouter
API client
services/api/client.ts — later RTK Query base API or plain fetch wrapper
Dashboard home
One page: features/dashboard/pages/PortalHomePage.tsx (or keep in shared) — all roles render it with optional role prop for copy/widgets, or role-specific widgets composed inside each feature’s Dashboard.tsx
Redux:

If you need server cache + invalidation: RTK Query in store/ + feature injectEndpoints.
If state stays small: keep Context + URL state and remove @reduxjs/toolkit / react-redux until needed.
6. File refactoring map (high level)
Current	New / renamed
components/templates/DashboardLayout.tsx
layouts/AppShellLayout.tsx (or components/layout/AppShell.tsx if you prefer layout components co-located)
layouts/AdminLayout.tsx
Thin wrapper using AppShellLayout + adminNav
layouts/InstructorLayout.tsx etc.
Same; nav from features/<role>/config/navigation.ts
components/dashboard/SharedRoleDashboard.tsx
Remove or fold into features/dashboard/pages/Home.tsx
features/*/pages/Dashboard.tsx
Each re-exports or composes shared home or role-specific dashboard only where needed
router/AppRouter.tsx
Split: app/router/index.tsx + routes/*.tsx with React.lazy
store/hooks.ts
Either implement store or delete + uninstall Redux
Deep imports
Add resolve.alias in vite.config.ts: @ → src
7. Code quality practices (concrete)
Lazy routes per role to cut initial JS.
Named exports for new modules (easier refactors); keep default exports only where Router already expects them during migration.
Colocate tests later: features/admin/pages/Users.test.tsx next to page.
Error boundaries per layout or per route segment for production resilience.
8. Deliverables
New folder structure (tree)
src/
  app/
    providers/AppProviders.tsx
    router/
      index.tsx
      public.routes.tsx
      student.routes.tsx
      instructor.routes.tsx
      mentor.routes.tsx
      admin.routes.tsx
  core/
    config/env.ts
    constants/routes.ts
    hooks/useLogout.ts
    hooks/useForceDashboardTheme.ts
    lib/cn.ts
  layouts/
    AppShellLayout.tsx
  components/
    ui/
      button.tsx
      input.tsx
      card.tsx
      modal.tsx
      data-table.tsx
  features/
    admin/
      config/navigation.ts
      pages/...
    student/
      config/navigation.ts
      pages/...
    instructor/
      config/navigation.ts
      pages/...
    mentor/
      config/navigation.ts
      pages/...
    auth/
      pages/...
  services/
    api/
      client.ts
  context/auth/          # migrate to app/providers or keep until Redux decision
  styles/global.css
Refactored examples (patterns)
1) Single layout (concept) — admin becomes identical to other roles: links from adminNav, same AppShellLayout, no duplicated header/sidebar.

2) One feature module — navigation

// features/admin/config/navigation.ts
import { navIcon } from "@/components/dashboard/navIcon"; // or move to core/lib/icons
export const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/admin/users", label: "User Management", icon: navIcon("group") },
  // ...
];
3) One shared UI primitive — Button

// components/ui/button.tsx — variants via cva, forwardRef, merge className with cn()
(Implementation is standard; your stack already includes clsx, tailwind-merge, and cva — wire them once in core/lib/cn.ts.)

9. Migration steps (safe, incremental)
Add Vite alias @ → ./src — change imports gradually or in one pass with IDE refactor.
Extract useForceDashboardTheme + useLogout — switch all layouts to use them; behavior unchanged.
Replace AdminLayout body with the same shell as DashboardLayout (rename to AppShellLayout in the same PR or immediately after). Visual QA admin vs other roles.
Move nav arrays to features/<role>/config/navigation.ts**; layouts only compose.
Unify dashboard entry: either all roles use one PortalHomePage or keep role files but each is a one-liner importing the same component.
Introduce components/ui incrementally — replace the most duplicated patterns first (buttons in Users.tsx, header buttons in shell).
Adopt TanStack Table on one screen (Users) as the template for others.
Router split + React.lazy — one role at a time to avoid a huge diff.
Redux decision — implement or remove from package.json.
Clean tailwind.config.js content paths and document token source in global.css.
Throughout: one vertical slice at a time (e.g. “admin shell only”), run npm run build after each slice.

Architecture mindset (production SaaS)
Shell is a platform concern (layouts/ + core/hooks) — never fork per role.
Features own screens and nav metadata — the app shell only consumes config.
Design system owns primitives — features own composition.
API and domain types stay behind small modules so when the backend arrives you do not rewrite every page.
If you complete the Arabic sentence («بحيث…»), I can extend this plan (for example RTL, locale-based nav labels, or stricter Clean Architecture folders like application/ and domain/ per feature).