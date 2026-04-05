# Why UI

Elm UI primitives for forms and dashboards, styled with **Tailwind CSS**. Components use familiar patterns (phantom builder for buttons, record-based configs for larger widgets) and ship with a single demo page that exercises every module.

## What’s included

| Area | Module | Notes |
|------|--------|--------|
| Actions | [`Button`](src/Button.elm) | Primary / secondary / link / negative styles, sizes, icons, links, disabled state, tab strip helper |
| Inputs | [`InputField`](src/InputField.elm) | Text, decimal, password toggle, labels / placeholders, errors |
| Composition | [`Element`](src/Element.elm) | Autocomplete, multiselect, singleselect, textarea, dropdown, pagination, modal, table, notifications, accordion, and more |
| Graphics | [`Icon`](src/Icon.elm) | SVG and HTML icon set with shared `Size` helpers |
| Feedback | [`ErrorUI`](src/ErrorUI.elm) | Field errors and standalone messages |
| Tokens | [`Colors`](src/Colors.elm) | Tailwind-oriented color helpers for SVG / markup |

Validation helpers for the demo live in [`packages/elm-validation`](packages/elm-validation) (Git submodule).

## Requirements

- [Node.js](https://nodejs.org/) (for npm scripts and Tailwind)
- [Elm](https://elm-lang.org/) 0.19.1 (also pulled in via npm in this repo)

## Setup

Clone with submodules so `packages/elm-validation` is populated:

```bash
git clone --recurse-submodules <repository-url>
cd why-ui
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

Install JavaScript tooling:

```bash
npm install
```

## Run the demo

The [`start`](package.json) script compiles [`examples/Demo.elm`](examples/Demo.elm) to `dist/elm.js` and watches Tailwind so class names from `src/` and `examples/` stay in `dist/tailwind.build.css`.

```bash
npm start
```

Then open [`index.html`](index.html) in a browser (local file or any static server). The page loads `dist/elm.js`, `dist/style.css`, and `dist/tailwind.build.css`.

One-off build without watch:

```bash
npx elm make examples/Demo.elm --output=dist/elm.js
npx tailwindcss -i tailwind.css -o dist/tailwind.build.css
```

## Project layout

- [`src/`](src/) — UI modules intended for reuse
- [`examples/Demo.elm`](examples/Demo.elm) — showcase app (`Elm.Demo`)
- [`tailwind.config.js`](tailwind.config.js) — content paths, animations used by notifications, safelist for dynamic Tailwind classes in Elm strings
- [`elm.json`](elm.json) — application entry with `src`, `examples`, and `packages/elm-validation/src` on the source path

## Using this in another Elm app

There is no published `elm.json` package type here yet; integration is typically “vendor” the `src` modules (and validation code if you need it), point Tailwind at your Elm sources, and reuse the same safelist patterns where you build class names dynamically.

## License

See [LICENSE](LICENSE).
