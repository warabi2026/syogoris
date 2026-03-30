/* テトリス PWA — オフライン起動用の最小キャッシュ */
const CACHE_NAME = "tetris-pwa-v4";
const PRECACHE_URLS = ["./index.html", "./manifest.json", "./icon.svg"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request).then(function (cached) {
        if (cached) return cached;
        return caches.match("./index.html");
      });
    })
  );
});
