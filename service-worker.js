self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  event.waitUntil(
    caches.open('eBilling-cache-v1').then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './icon-192.png',
        './icon-512.png',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});