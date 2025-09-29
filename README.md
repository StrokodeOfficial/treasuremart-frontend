# 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── public
├── README.md
├── src
│   ├── components //reusable components
│   │   ├── BaseHead.astro //contains <head> tag used across the whole site
│   │   └── global  //globally used components
│   │       ├── Footer.astro
│   │       └── Navigation.astro
│   ├── layouts //reusable layouts
│   │   └── BaseLayout.astro //each pages should include this layout, can pass seo tags
│   ├── pages //site pages rendered in frontend
│   │   ├── cart.astro
│   │   ├── categories
│   │   │   ├── indes.astro
│   │   │   └── [slug].astro
│   │   ├── checkout.astro
│   │   ├── index.astro
│   │   ├── products
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── thank-you.astro
│   └── styles
│       └── global.css //declaring custom css and font, shouldn't touch tailwind import
└── tsconfig.json
```

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
