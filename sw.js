const CACHE_NAME = 'bank-cache-v3';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// نصب و ذخیره فایل‌ها
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// فعال‌سازی و پاکسازی کش قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// پاسخگویی به درخواست‌ها
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
