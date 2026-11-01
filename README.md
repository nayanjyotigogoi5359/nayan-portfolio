# Nayan — Portfolio

Personal portfolio built with Next.js 14, React, TypeScript, SCSS Modules, GSAP, Framer Motion and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start

npm run typecheck
```

## Update portfolio content

Most personal content is in `data/content.ts`:

- `profile`: display name, location and role line.
- `links`: public contact and social links. Keep unavailable profiles as `null`; do not leave placeholder URLs.
- `toolkit`: skills and honest learning/practice status.
- `projects`: project descriptions, stage, problem, approach, tools and optional live links.

Use real screenshots and working URLs when a project is ready to show. Do not describe an experiment as a shipped client project.

## Design system

- Display: Space Grotesk
- Body: Inter
- Technical labels: IBM Plex Mono
- Palette and shared spacing: `styles/_tokens.scss`
- Global styles: `app/globals.scss`

The portrait image is `public/nayan.jpg`.
