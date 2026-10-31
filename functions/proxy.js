/* Same-origin relay for the hosted movie (?v= on the player page).

   Why it exists: a cross-origin <video> cannot be routed through Web Audio
   unless the server sends CORS headers, and without that the4x volume boost
   is unavailable (cross-origin audio through Web Audio is force-silenced).
   Responses served through THIS origin are same-origin for the browser, so
   the boost applies in full — and Range/seeking is forwarded, so the1 GB
   file still streams and scrubs exactly like a direct request.

   Only the known R2 video host may be relayed; anything else is rejected. */

const ALLOWED_HOST = 'pub-85706559f57d4bc5b17d1bd3a9567bfb.r2.dev';

export async function onRequest({ request }) {
  let target = null;
  try {
    target = new URL(new URL(request.url).searchParams.get('u') || '');
  } catch (e) {
    return new Response('bad url', { status: 400 });
  }
  if (target.protocol !== 'https:' || target.hostname !== ALLOWED_HOST) {
    return new Response('forbidden', { status: 403 });
  }

  const headers = new Headers();
  const range = request.headers.get('Range');
  if (range) headers.set('Range', range);   // keep byte-range streaming / seeking intact
  if (request.headers.get('If-Range')) headers.set('If-Range', request.headers.get('If-Range'));

  let upstream;
  try {
    upstream = await fetch(target.toString(), { headers, redirect: 'follow' });
  } catch (e) {
    return new Response('upstream fetch failed', { status: 502 });
  }

  const out = new Headers(upstream.headers);
  out.set('Access-Control-Allow-Origin', '*');
  // long-lived edge caching keeps relay requests (and the function quota) low
  out.set('Cache-Control', 'public, max-age=3600');

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: out,
  });
}
