var CACHE_NAME = 'restaurant-review-cache-v1';
var urlsToCache = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch');
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true})
      .then(function(response) {
        if (response) {
          console.log('cache hit', event.request.url);
          return response;
        }
        console.log('cache miss', event.request.url)
        return fetch(event.request);
      }
    )
  );
});
