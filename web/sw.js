// Offline cache so the app still opens on spotty ship Wi-Fi.
// Bump VERSION when shipping changes to force a fresh precache.
const VERSION = 'voyager-v6';
const PRECACHE = [
  './',
  'index.html',
  'support.js',
  'manifest.webmanifest',
  'ds/styles.css',
  'ds/_ds_bundle.js',
  'vendor/react.production.min.js',
  'vendor/react-dom.production.min.js',
  'vendor/phosphor/style.css',
  'vendor/phosphor/Phosphor-Duotone.woff2',
  'icons/icon-192.png',
  'icons/apple-touch-icon.png',
];
const CACHEABLE_HOSTS = [location.host, 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: answer from cache instantly, refresh in the background.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || !CACHEABLE_HOSTS.includes(url.host)) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: url.host === location.host });
    const net = fetch(e.request)
      .then(res => { if (res.ok || res.type === 'opaque') cache.put(e.request, res.clone()); return res; })
      .catch(() => hit);
    return hit || net;
  }));
});
