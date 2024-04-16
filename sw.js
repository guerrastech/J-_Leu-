const CACHE_NAME = 'cache';

const PRECACHE_ASSETS = [
         './index.html',
         './style.css',
          './android/android-launchericon-512-512.png',
          './android/android-launchericon-192-192.png',
          './android/android-launchericon-144-144.png',
          './android/android-launchericon-96-96.png',
          './android/android-launchericon-72-72.png',
          './android/android-launchericon-48-48.png',
          './ios/16.png',
          './ios/20.png',
          './ios/29.png',
          './ios/32.png',
          './ios/40.png',
          './ios/50.png',
          './ios/57.png',
          './ios/58.png',
          './ios/60.png',
          './ios/64.png',
          './ios/72.png',
          './ios/76.png',
          './ios/80.png',
          './ios/87.png',
          './ios/100.png',
          './ios/114.png',
          './ios/120.png',
          './ios/128.png',
          './ios/144.png',
          './ios/152.png',
          './ios/167.png',
          './ios/180.png',
          './ios/192.png',
          './ios/256.png',
          './ios/512.png',
         './ios/1024.png',
]


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Verifica se a solicitação pertence à extensão do Chrome
      if (event.request.url.startsWith('chrome-extension://')) {
        return fetch(event.request);
      }

      return fetch(event.request).then(response => {
        // Verifica se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clona a resposta para armazenamento em cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          // Verifica se a solicitação não pertence à extensão do Chrome antes de armazená-la em cache
          if (!event.request.url.startsWith('chrome-extension://')) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});







