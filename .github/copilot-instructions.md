# Gemz Software: redesign instructions for Copilot

You are continuing the build of a from-scratch redesign of the landing website for
Gemz Software (https://gemzsoftware.com/), a company that sells enterprise software
(custom development, procurement systems, disaster recovery, maritime logistics,
real estate platforms) to large organisations. Only the brand colours carry over from
the current site; layout, structure and visuals are new.

## Read first
- `AGENTS.md`: this Next.js version (16.3.x) has breaking changes. Before writing any
  Next.js code, read the relevant guide in `node_modules/next/dist/docs/01-app/`
  (getting-started, server-and-client-components, fonts, metadata, images).
  Do not rely on memory.
- `docs/design-system/colors.md`: the extracted palette and the design direction.
- `CLAUDE.local.md`: project rules. Its "Mentor" persona section is for a different
  assistant; ignore it. You are building, not teaching.

## Stack (already installed, do not change without asking)
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (theme defined in CSS with
`@theme inline` in `src/app/globals.css`, no tailwind.config) + `motion` v14
(import from `motion/react` in client components, `motion/react-client` in server
components) + `lucide-react`. Package manager: npm. `src/` directory, alias `@/*`.

## Design direction (decided)
- Soft, calm, trustworthy, with confident typography. Audience: enterprise buyers.
- Soft tinted surfaces for most sections; dark green sections used sparingly
  (hero, final CTA).
- The vivid green-to-emerald gradient (`green-400` to `emerald-500`) is only for
  primary buttons and key highlights.
- No OS dark mode (the `prefers-color-scheme` block was deliberately removed).
  Remove leftover `dark:` classes if you see any.
- Contrast: use `brand-dark` (#00776e) for small text and links on light backgrounds;
  `brand` (#009588) only for buttons, icons and large headings.
- Colour tokens in `globals.css`: brand, brand-dark, brand-light, brand-tint, page,
  forest-from, forest-to, forest-surface, forest-deep. Use Tailwind's default
  slate/gray for text and borders.
- Motion: gentle, short, never bouncy. Shared presets live in `src/lib/motion.ts`
  (ease, duration, fadeUp, stagger, hoverLift, tapPress). Use them. Respect
  `prefers-reduced-motion` (wrap the app in Motion's `MotionConfig` with
  `reducedMotion="user"`).

## UI rules (non-negotiable)
- Mobile-first: design at 375px first, no horizontal scroll, minimum 44px tap targets.
- Icons: Lucide only. Never emoji or system icons.
- Interactive and engaging: hover/tap feedback, scroll reveals.
- Accessibility: semantic HTML, visible focus states, alt text, AA contrast.
- Only add `"use client"` to components that need hooks, state, or browser APIs.
  Keep everything else a server component.
- TypeScript strict: never use `any` or `@ts-ignore`.

## Code must teach (the owner is learning React and Next.js)
- Keep components small, one job each, with clear names.
- Add a brief comment wherever a React or Next.js choice is non-obvious: why a file
  has `"use client"`, why a component is a server component, what a variant is,
  why a prop is typed the way it is. Explain the why, not the what.
- Do not add comments that only restate the code.
- Prefer plain, readable patterns over clever abstractions.

## Already done
- Scaffold, colour tokens, `src/lib/cn.ts` (class-name joiner), `src/lib/motion.ts`.
- `src/app/page.tsx` is a placeholder; replace it. `src/app/layout.tsx` metadata
  is placeholder text; rewrite for SEO.

## Build order
1. Design system in `src/components/ui/`: Button (primary gradient, secondary, ghost;
   hover and tap feedback), Container, Section, SectionHeading, Card, Badge, IconBox
   (Lucide icon in a soft tinted square), StatCard, Testimonial, Navbar (with
   accessible mobile menu), Reveal (fade-and-rise on scroll), staggered list.
   Each accepts an optional `className` merged with `cn()`.
2. A `/design-system` page (`src/app/design-system/page.tsx`) showing every
   component in every state.
3. Landing sections in `src/components/sections/` (hero, services, proof/stats,
   industries, testimonials, CTA, footer), composed in `src/app/page.tsx`. Take real
   copy from the live site. Do not invent claims, numbers or client names; leave a
   clearly marked placeholder and list what is missing.
4. SEO: metadata, Open Graph, `lang`, semantic headings (one h1).
Work in small steps and stop after each numbered item so the owner can review it.

## Git and process rules
- Solo project. Work directly on the `dev` branch. Never commit or push to `master`.
  Never force-push.
- Small commits with Conventional Commit messages (`feat:`, `fix:`, `chore:`,
  `docs:`, `style:`, `refactor:`). No `Co-Authored-By` lines, no "Generated with"
  lines, no mention of any AI as author. Do not touch git user settings.
- Do not push unless asked. Never commit secrets or `.env*` files.
- Before each commit run `npx tsc --noEmit` and `npm run lint`; run `npm run build`
  after big changes. If any fail, say so instead of committing.
- Do not install new dependencies without asking.
- Report plainly what you did, what you skipped, and anything that failed.
