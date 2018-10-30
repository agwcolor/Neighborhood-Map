const cacheName = 'neighborhoodmap-app-v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/index.js',
    '/App.css',
    '/App.js',
    '/sidebar.js',
    '/index.css',
    '/utils/utils.js'
];
/*  install service workder */
window.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log(cacheFiles);
            return cache.addAll(cacheFiles);
        }).then(function(){
          return window.skipWaiting();
        }).catch(function(){
          console.log("something is not working");
        })
    );
});

// Activate event
window.addEventListener('activate', function(event) {
  return window.clients.claim();
});

/*  get items from cache if it's there */
window.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response ||
      fetch(event.request);
    })
  );
});

/*  get items from cache if it's there */
window.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response ||
      fetch(event.request)
    })
  );
});

