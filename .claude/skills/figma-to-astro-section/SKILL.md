---
name: figma-to-astro-section
description: Implement one Figma section at a time into an Astro + Tailwind component/template with high visual accuracy, responsive behavior, and clean reusable code.
---

# Figma to Astro Section Implementation Skill

## Purpose

Use this skill when converting a Figma design into an Astro template **section by section**.

This skill is optimized for:
- Astro
- Tailwind CSS
- TypeScript
- Figma MCP
- section-by-section implementation
- reusable components
- high visual accuracy
- responsive behavior

The goal is to avoid vague code generation and instead follow a strict repeatable workflow for each section.

---

## Core rule

For every section, always follow this order:

1. Inspect selected Figma section with MCP
2. Summarize implementation-relevant design details
3. Map design values to project patterns and Tailwind utilities
4. Check whether existing components should be reused
5. Implement only that section
6. Review for responsive behavior
7. Compare implementation back to design
8. Refine only the mismatches
9. Report approximations or unclear design decisions

Never skip directly from selection to final code without analysis.

---

## Scope

This skill should be used for one isolated section at a time, such as:
- Header
- Hero
- Feature grid
- Logo cloud
- Testimonial section
- Pricing section
- CTA banner
- Footer
- Card list
- Content block
- FAQ section

Do not implement the entire page at once unless explicitly requested.

---

## Inputs expected

Before starting, identify or ask Claude to infer:

- selected Figma frame/component/section
- target Astro file or component location
- whether section should be reusable
- whether existing project components already match part of the design
- relevant breakpoints or inferred responsive behavior
- whether tokens/utilities already exist in the codebase

If some information is missing, proceed with the best grounded assumption and clearly state it.

---

## Required implementation workflow

For each section, do the following.

### Step 1: Read the Figma section through MCP

Inspect the selected Figma section and extract:

- layout structure
- parent/child hierarchy
- spacing between elements
- padding/margins
- typography
- colors
- border radius
- shadows
- strokes/borders
- image/icon usage
- alignment rules
- component variants/states if visible
- responsive intent if inferable

Do not immediately generate code.

---

### Step 2: Summarize the section before coding

Produce a short implementation-focused summary with:

- section purpose
- main layout direction
- key nested blocks
- important spacing values
- important typography values
- reusable UI pieces
- possible responsive changes

Keep summary practical and short.

Example format:

- Section: testimonial grid
- Layout: heading block + 3 card grid
- Spacing: large vertical padding, medium card gaps
- Typography: bold heading, muted body text
- Reusable pieces: testimonial card, avatar row
- Responsive: 3 columns desktop, 1 column mobile

---

### Step 3: Map design to project codebase

Before writing code:

- inspect existing components and utilities
- reuse existing wrappers, containers, buttons, headings, cards, badges, etc.
- map design values to Tailwind classes
- prefer project tokens/utilities over hardcoded arbitrary values
- only use arbitrary values when the design cannot be represented well otherwise

Rules:
- prefer consistency over one-off styling
- do not duplicate an existing component
- do not introduce a new abstraction unless reuse is likely
- keep Astro structure simple

---

### Step 4: Decide component strategy

Choose one of these approaches:

#### A. Inline section markup
Use when the section is unique and unlikely to repeat.

#### B. Reusable section component
Use when the whole section may repeat across templates/pages.

#### C. Shared subcomponents
Use when the section contains repeatable UI like:
- cards
- stats
- feature items
- badges
- CTA blocks

Prefer extracting repeated subparts only when it improves clarity.

Do not over-componentize.

---

### Step 5: Implement the section

Generate Astro markup and Tailwind classes for only the selected section.

Requirements:
- semantic HTML
- accessible structure where reasonable
- mobile-first styling
- clean class organization
- minimal wrapper nesting
- no unnecessary JS
- no React/Vue patterns unless explicitly required
- TypeScript props only if needed
- preserve clean Astro conventions

Always:
- keep DOM structure aligned with Figma hierarchy
- keep spacing rhythm intentional
- keep naming clear
- use `container`/section wrappers consistent with project style
- use Image or Picture Astro components for images
- ensure images have useful alt text or empty alt if decorative
- use buttons/links semantically

---

### Step 6: Responsive pass

After initial implementation, explicitly review responsive behavior.

Check:
- stack vs row transitions
- grid column changes
- text wrapping
- spacing reduction on small screens
- image scaling/cropping
- button/link layout
- overflow risks
- awkward large-screen empty space

If Figma only shows desktop, infer a sensible mobile layout.
If Figma only shows mobile, infer a sensible desktop layout.
State when responsive behavior is inferred.

---

### Step 7: Compare against Figma

Perform a refinement pass against the same Figma section.

Review:
- spacing
- alignment
- typography scale
- visual hierarchy
- card proportions
- border radius
- shadows
- colors
- container width
- gaps between blocks
- breakpoint behavior

Refine only mismatches.
Do not rewrite the whole section if only spacing/alignment is off.

---

### Step 8: Final output structure

For each completed section, provide:

1. what was implemented
2. whether existing components were reused
3. any responsive assumptions made
4. any approximations due to unclear design details
5. any optional next cleanup/refactor suggestions

Keep this concise.

---

## Default rules

### Reuse first
Always search for existing project patterns before creating new markup or styles.

### Accuracy over speed
Do not rush into code before inspecting and mapping design details.

### Section isolation
Work on one section at a time unless explicitly asked to assemble multiple sections.

### No invention
Do not add extra UI, effects, or content not supported by design or project conventions.

### Sensible responsiveness
When design responsiveness is unclear, choose a practical mobile-first layout.

### Clean Astro output
Prefer simple `.astro` files and small reusable components over unnecessary complexity.

### Avoid these mistakes
Do not:
- implement whole page at once by default
- ignore existing components
- hardcode too many arbitrary pixel values
- invent interactions not shown in design
- use deeply nested wrappers without reason
- skip the refinement pass
- silently guess important design choices

---

## Definition of done

A section is done only if:

- Figma section was inspected first
- implementation summary was created
- existing codebase patterns were checked
- Astro + Tailwind implementation is complete
- responsive behavior was reviewed
- design comparison/refinement pass was done
- approximations were listed if any

If any of the above is missing, the section is not finished.

---

## Standard execution prompt

When using this skill, follow this command pattern:

"Use the figma-to-astro-section skill for the currently selected Figma section. Inspect it with Figma MCP, summarize the implementation details, check whether existing project components should be reused, implement only this section in Astro + Tailwind, then do a compare-and-refine pass."

---

## Short execution prompt

"Implement the selected Figma section using the figma-to-astro-section skill."

---

## Output style

Keep reasoning visible in compact implementation form:

1. Section summary
2. Reuse/component decision
3. Implementation
4. Responsive notes
5. Refinement notes
6. Approximations

Do not output long generic explanations.

---

## Example tasks

- Implement selected hero section as `HeroSection.astro`
- Convert selected pricing section into Astro + Tailwind using existing button/card components
- Build selected testimonial grid and extract reusable testimonial card if justified
- Recreate selected CTA banner with responsive stacking and spacing refinement
- Implement selected footer using current layout/container conventions

---

## If asked to assemble a page

If multiple sections are completed and the user asks to assemble the page:

1. keep completed sections as they are
2. create page composition only after individual sections are stable
3. do not rework section internals unless necessary
4. ensure spacing consistency between adjacent sections
5. preserve component reuse

Page assembly is secondary to section accuracy.

---