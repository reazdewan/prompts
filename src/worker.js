// Motion View prompts site.
// Everything is served from /public, except the Library PDFs in /public/books/.
// Those are only handed to the site's own reader page (which sends a special header).
// Opening a PDF link directly in the browser, or from another site, gets a "read it in the Library" page instead.

const READER_HEADER = 'x-mv-reader';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/books/')) {
      const fromReader = request.headers.get(READER_HEADER) === '1';
      const dest = request.headers.get('sec-fetch-dest');
      const site = request.headers.get('sec-fetch-site');
      const sameSite = !site || site === 'same-origin';
      const notNavigation = !dest || dest === 'empty';

      if (!fromReader || !sameSite || !notNavigation) {
        return new Response(blockedPage(url.origin), {
          status: 403,
          headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' }
        });
      }

      const res = await env.ASSETS.fetch(request);
      const headers = new Headers(res.headers);
      headers.set('cache-control', 'no-store');
      headers.set('content-disposition', 'inline');
      headers.set('x-robots-tag', 'noindex, nofollow');
      return new Response(res.body, { status: res.status, headers });
    }

    return env.ASSETS.fetch(request);
  }
};

function blockedPage(origin) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Read in the Library</title><meta name="robots" content="noindex">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F4F7FA;color:#0F2240;font:16px/1.5 "Helvetica Neue",Arial,sans-serif;padding:20px}
.b{max-width:440px;text-align:center;background:#fff;border:1px solid #D5DEEA;border-radius:18px;padding:32px 26px}
h1{font-size:24px;margin:0 0 8px}p{margin:0 0 20px;color:#52627A}
a{display:inline-block;background:#0F2240;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:12px}</style></head>
<body><div class="b"><h1>This book is read online</h1><p>Open it in the Motion View Library to read it for free.</p><a href="${origin}/library/">Go to the Library</a></div></body></html>`;
}
