const cacheName = 'neighborhoodmap-app-v1';
const cacheFiles = [
    '/',
    '/index.html',
];
/*  install service workder */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log(cacheFiles);
            return cache.addAll(cacheFiles);
        }).then(function(){
          return self.skipWaiting();
        }).catch(function(){
          console.log("something is not working");
        })
    );
});

// Activate event
self.addEventListener('activate', function(event) {
  return self.clients.claim();
});

/*  get items from cache if it's there */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response ||
      fetch(event.request);
    })
  );
});

/*  get items from cache if it's there */
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response ||
      fetch(event.request)
    })
  );
});

