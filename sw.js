const CACHE_NAME = 'bank-v5'; // تغییر ورژن برای آپدیت کش
const assets = [
  '/Hamrahbank/',
  '/Hamrahbank/index.html',
  '/Hamrahbank/manifest.json',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
