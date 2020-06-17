const CACHE_NAME = "mltricks-v1.3.1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/run-sw.js",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/heroes.html",
  "/pages/build.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/css/style.css",
  "/js/nav.js",
  "/images/icons/maskable_icon.png",
  "/images/icons/ml-icon.png",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/mobilelegends.jpg",
  "/images/ml-heroes.jpeg",
  "/images/heroes/1-thumbs.jpg",
  "/images/heroes/2-thumbs.jpg",
  "/images/heroes/3-thumbs.jpg",
  "/images/heroes/4-thumbs.jpg",
  "/images/heroes/5-thumbs.jpg",
  "/images/heroes/6-thumbs.jpg",
  "/images/ml-items.jpg",
  "/images/xborg-combo.mp4",
  "/images/harith-combo.mp4",
  "/images/bd-adi.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// untuk merunning service worker juga
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});


// menghapus cache lama
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});