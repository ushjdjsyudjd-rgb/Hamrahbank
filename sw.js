// نام کش برای مدیریت نسخه‌ها
const cacheName = 'hamrah-bank-v1';

// لیست فایل‌هایی که باید برای کارکرد آفلاین ذخیره شوند
// دقت کن که نام مخزن (Hamrahbank) حتماً در مسیرها باشد
const assets = [
  '/Hamrahbank/',
  '/Hamrahbank/index.html',
  '/Hamrahbank/manifest.json',
  'https://cdn.tailwindcss.com'
];

// مرحله نصب: فایل‌ها در حافظه گوشی ذخیره می‌شوند
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('فایل‌ها در کش ذخیره شدند');
      return cache.addAll(assets);
    })
  );
});

// مرحله فعال‌سازی: حذف کش‌های قدیمی (اگر نسخه جدید دادی)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// مرحله پاسخگویی: وقتی اینترنت نیست، فایل‌ها را از حافظه می‌خواند
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
