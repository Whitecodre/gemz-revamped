# Gemz colour palette

## Design direction (decided 2026-10-06)
- Full redesign from scratch; only the brand colours are kept from the current site.
- Feel: **soft, calm, trustworthy**, with confident typography. Audience is
  enterprise buyers, so steady and professional beats loud.
- Soft tinted surfaces for most sections; dark green sections used sparingly
  (hero, final call to action).
- The vivid green-to-emerald gradient is reserved for primary buttons and key highlights.
- No automatic OS dark mode; the site looks the same for everyone.
- **Contrast:** brand teal `#009588` is about 3.7:1 on white (below the 4.5:1 AA
  minimum for small text). Use `brand-dark` `#00776e` (about 5.4:1) for small
  text and links on light backgrounds; keep `#009588` for buttons, icons and
  large headings. Estimates; verify with a contrast checker.
- Collapse the old site's many similar greens into two roles: teal = brand,
  green-to-emerald gradient = highlight.

## Signature identity: "Facets" (decided 2026-10-12)
The Gemz name gives the visual idea: a gem is flat planes that catch the light.
Repeat it, calmly, everywhere:
- **Gem illustration** (`GemVisual`) as the hero and closing-section mark.
- **Facets backdrop** (`Facets`, `backdrop="facets"`): large translucent planes
  that drift at different speeds on scroll.
- **Cut edges** (`Section edgeTo`): sections meet on a diagonal that reveals the
  next section's tone; alternate with `flip` so it zig-zags.
- **Gem-cut shapes**: octagonal icon boxes, cards with chamfered corners and a
  flat facet plane (`GemFrame`, `facet` prop),
  diamond eyebrow markers, chamfered swatches.
- **Varied composition**: bento grids, split layouts and big numbers, not the
  same eyebrow + heading + card grid in every section.
Keep it subtle: facets are low-opacity and decorative, never competing with copy.

## Palette extracted from the current site

Extracted from https://gemzsoftware.com/ (its compiled Tailwind CSS and HTML) on 2026-10-06.
The current site is a **green / emerald / teal** brand on near-black green dark
sections, with white/slate light sections. It is built with Tailwind, so these
map directly onto Tailwind's default palette.

## Brand (primary accents)
| Role | Token | Hex |
|---|---|---|
| Primary accent (most used text/links) | teal-600 | `#009588` |
| Primary accent, dark (hover) | teal-700 | `#00776e` |
| Gradient start / highlights | green-400 | `#05df72` |
| Gradient end / buttons | emerald-500 | `#00bb7f` |
| Accent on dark backgrounds | emerald-400 | `#00d294` |
| Accent text, light bg | emerald-600 | `#009767` |
| Accent text, light bg (alt) | green-600 | `#00a544` |
| Soft light accent | emerald-300 / green-300 | `#5ee9b5` / `#7bf1a8` |
| Tinted backgrounds | emerald-50 / green-50 | `#ecfdf5` / `#f0fdf4` |

Translucent accent usage seen on the site: `emerald-500/10`, `emerald-500/5`,
`emerald-500/30` (borders), `green-500/10` (borders), `emerald-100/80` (text on dark).

## Dark sections (custom hex, not in Tailwind's palette)
| Role | Hex |
|---|---|
| Gradient from | `#0a1f16` |
| Gradient to | `#07140e` |
| Dark surface | `#10231b` |
| Darkest background | `#020b08` |

## Neutrals (light sections and text)
| Role | Hex |
|---|---|
| Page background (custom) | `#fafbfc` |
| Light surfaces | slate-50 `#f8fafc`, slate-100 `#f1f5f9` |
| Borders | slate-300 `#cad5e2` |
| Headings | slate-900 `#0f172b`, gray-900 `#101828` |
| Body text | slate-700 `#314158`, gray-700 `#364153`, gray-600 `#4a5565` |
| Muted text | gray-500 `#6a7282`, gray-400 `#99a1af` |
| White / black | `#fff` / `#000` |

## Status (minor)
red-50 `#fef2f2`, red-100 `#ffe2e2`, red-800 `#9f0712` (errors).

## Typography
No custom web font found: the site uses the system sans stack
(`ui-sans-serif, system-ui, sans-serif`). Weights seen: light, medium, bold, extrabold.
Decide later whether the revamp keeps system fonts or adds one via `next/font`.

## Notes
- Raw files used for extraction were kept outside the repo.
- Colours were read from code, not from a visual review; confirm against the
  live site (and any brand guide Gemz has) before finalising.
