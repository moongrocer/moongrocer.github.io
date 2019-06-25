self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('GeoMap').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html'
        ]);
      })
    );
   });