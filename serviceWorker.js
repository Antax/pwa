var CACHE_NAME = "ginkobus";

var contentToCache = [
    "./index.html",
    "./app.js",
    "./manifest.json",
    "./style.css",
    "./icons/favicon.ico",
    "./icons/icon-32.png",
    "./icons/icon-64.png",
    "./icons/icon-96.png",
    "./icons/icon-128.png",
    "./icons/icon-168.png",
    "./icons/icon-180.png",
    "./icons/icon-192.png",
    "./icons/icon-256.png",
    "./icons/icon-512.png",
    "./icons/maskable_icon.png"
];

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
        console.log('a');
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        console.log('b');
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});