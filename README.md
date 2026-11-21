# Motion View Prompt Directory

2,288 free AI prompts in 25 categories, with search, fill-in blanks, copy, save,
and open in ChatGPT or Claude. Subscribe buttons go to https://motionview.beehiiv.com/subscribe.

- `index.html`: the whole site (prompts, styles and code are all in this one file).
- `_headers`: security headers and no-cache, so updates show on a normal reload.

## Hosting

Cloudflare Pages, connected to this repo. Every push to `main` goes live in about a minute.
Build settings: framework preset **None**, build command **empty**, output directory **/**.

## Prompt sources

- 1,298 original Motion View prompts.
- 990 prompts added on 2026-11-21 from prompts.chat (github.com/f/awesome-chatgpt-prompts),
  whose prompt content is dedicated to the public domain under CC0 1.0. They were filtered
  (English only, 120 to 1,400 characters, no jailbreak or adult content, no model-version or
  trademark references), de-duplicated against the existing set, given [BRACKET] fill-ins,
  and sorted into categories. New categories: Health and Fitness, Travel and Lifestyle,
  Fun and Games, Ask an Expert, AI Image Prompts.
