# Motion View Prompt Directory

2,288 free AI prompts in 25 categories, with search, fill-in blanks, copy, save,
and open in ChatGPT or Claude. Subscribe buttons go to https://motionview.beehiiv.com/subscribe.

- `public/index.html`: the whole site (prompts, styles and code are all in this one file).
- `public/_headers`: security headers and no-cache, so updates show on a normal reload.
- `wrangler.jsonc`: Cloudflare Worker settings (Worker name `prompts`, serves the `public` folder).

## Hosting

Cloudflare Worker `prompts` (https://prompts.motionview.workers.dev), connected to this repo.
Every push to `main` goes live in about a minute.
Build settings: build command **empty**, deploy command **npx wrangler deploy**, root directory **/**.

## Prompt sources

- 1,298 original Motion View prompts.
- 990 prompts added on 2026-11-21 from prompts.chat (github.com/f/awesome-chatgpt-prompts),
  whose prompt content is dedicated to the public domain under CC0 1.0. They were filtered
  (English only, 120 to 1,400 characters, no jailbreak or adult content, no model-version or
  trademark references), de-duplicated against the existing set, given [BRACKET] fill-ins,
  and sorted into categories. New categories: Health and Fitness, Travel and Lifestyle,
  Fun and Games, Ask an Expert, AI Image Prompts.

## Library (read-only PDFs)

- Put PDFs in `public/books/`.
- Add each book to `public/library/books.json`:
  `{"slug":"ai-prompts","title":"1500 AI Prompts","description":"One line.","file":"ai-prompts.pdf","cover":"/library/covers/ai-prompts.jpg"}` (`cover` is optional).
- `src/worker.js` only serves `/books/*` to the reader page (`/library/read.html`). Direct links get a "read it in the Library" page.
- Readers can't download, print or right-click from the reader. Screenshots can't be blocked by any website.

## Site layout (app shell)

- Sidebar and top search come from `public/assets/shell.css` and `public/assets/shell.js`.
- Pages: `/` Prompt library, `/library/` Library, `/library/read.html` reader, `/skills/` and `/ai-tools/` (coming soon).
- Book fields in `books.json`: `slug`, `title`, `description`, `file`, `cover`, `tag`, `added` (YYYY-MM-DD), `prompts` (page, title, text).
