/* BSA Study Desk: offline support.
   Keeps a copy of the app on each device so it opens without internet.
   Your study data is NOT stored here; it lives in the browser's storage and in your GitHub data repo.
   If you change this file later, bump VERSION so every device picks up the new copy. */
const CACHE_FAMILY = "study-desk-" + encodeURIComponent(new URL(self.registration.scope).pathname) + "-";
const VERSION = CACHE_FAMILY + "asset-update-20261123-v239-ipad-scroll-draggable-music-r01";
const SCOPE = self.registration.scope;               // e.g. https://you.github.io/bsa-dashboard/
const SHELL = ["index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "favicon.png", "avatar-front.png", "avatar-back.png", "avatar-happy.png", "avatar-walk.png",'./BSA_AI_SOURCE_RULES.md','./BSA_AI_PROMPT.md','./EXAMPLE-universal-rulebook.json'];
// Versioned application assets are essential: never activate an offline update
// that has the new HTML without its matching JavaScript and stylesheets.
const CORE_ASSETS = [
  'assets/app.js','assets/owner-auth.js','assets/updater.js',
  'assets/styles/foundation.css','assets/styles/components.css',
  'assets/styles/features.css','assets/styles/polish.css'
];
const CDN = [
  "https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js",
  "https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"
];

async function put(cache, key, resp) {
  try { await cache.put(key, resp); } catch (e) { /* storage full or opaque quirk: skip */ }
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    // Do not replace an existing offline app if essential files cannot be saved.
    // In particular, failed network responses cannot silently count as a success.
    const essentials = [SCOPE, ...CORE_ASSETS.map(path => new URL(path, SCOPE).href), ...CDN];
    await Promise.all(essentials.map(async (url) => {
      const response = await fetch(url, { cache: "reload" });
      if (!response.ok) throw new Error("Required offline resource unavailable: " + url);
      await cache.put(url, response);
    }));
    await Promise.all(SHELL.map(async (path) => {
      const url = new URL(path, SCOPE).href;
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await put(cache, url, response);
      } catch (e) { /* Optional icons do not prevent a safe update. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith(CACHE_FAMILY) && key !== VERSION) await caches.delete(key);
    await self.clients.claim();
  })());
});

const isAppPage = (url) => url.href === SCOPE || url.href === SCOPE + "index.html";

// The page itself: try the network first (so updates show up right away), fall back to the saved copy.
async function networkFirst(request) {
  const cache = await caches.open(VERSION);
  const net = fetch(request.url, { cache: "no-cache", credentials: "same-origin" }).then((r) => {
    if (r.ok) { void put(cache, SCOPE, r.clone()); void put(cache, SCOPE + "index.html", r.clone()); }
    return r;
  });
  net.catch(() => {});
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 3500));
  try {
    const first = await Promise.race([net, timeout]);
    if (first && first.ok) return first;
  } catch (e) { /* offline */ }
  const cached = (await cache.match(SCOPE)) || (await cache.match(SCOPE + "index.html"));
  if (cached) return cached;
  return net; // nothing saved yet: wait for the network
}

// Our own app files DO change with releases. Network-first prevents an old
// service worker cache from pinning yesterday's app.js or CSS indefinitely.
// The cached copy still works offline and on poor connections.
async function coreNetworkFirst(request, event) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(request, { ignoreVary: true });
  const net = fetch(request, { cache: "no-cache" }).then(async (response) => {
    if (response.ok) await put(cache, request, response.clone());
    return response;
  });
  // A fallback response may arrive before a slow network fetch; keep the
  // fetch alive so a subsequent navigation sees the refreshed asset.
  event.waitUntil(net.catch(() => null));
  try {
    const fresh = await Promise.race([net, new Promise(resolve => setTimeout(() => resolve(null), 3500))]);
    if (fresh && fresh.ok) return fresh;
  } catch (_) { /* offline: use the last verified asset */ }
  if (cached) return cached;
  return net;
}

// Versioned libraries never change: use the saved copy, download only if missing.
async function cacheFirst(request) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(request.url, { ignoreVary: true, ignoreSearch: false });
  if (hit) return hit;
  const r = await fetch(request);
  if (r.ok || r.type === "opaque") put(cache, request.url, r.clone());
  return r;
}

// Icons, manifest, fonts: answer from the saved copy instantly and refresh it in the background.
async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(request, { ignoreVary: true });
  const net = fetch(request).then((r) => {
    if (r.ok || r.type === "opaque") put(cache, request, r.clone());
    return r;
  }).catch(() => null);
  if (hit) { event.waitUntil(net); return hit; }
  return (await net) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.github.com") return;               // sync traffic always goes to GitHub live
  if (url.hostname === "generativelanguage.googleapis.com") return;   // AI tutor always goes live
  if (req.mode === "navigate" || isAppPage(url)) { event.respondWith(networkFirst(req)); return; }
  if (url.hostname === "cdn.jsdelivr.net") { event.respondWith(cacheFirst(req)); return; }
  if (CORE_ASSETS.some(path => url.origin === new URL(path, SCOPE).origin && url.pathname === new URL(path, SCOPE).pathname)) {
    event.respondWith(coreNetworkFirst(req, event)); return;
  }
  if (url.href.startsWith(SCOPE) || url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(staleWhileRevalidate(req, event));
  }
});