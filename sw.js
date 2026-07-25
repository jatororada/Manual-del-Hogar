const CACHE = 'hogar-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(hit => {
        const net = fetch(e.request).then(res => {
          if (e.request.method === 'GET' && res && res.status === 200) {
            cache.put(e.request, res.clone());
          }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    )
  );
});