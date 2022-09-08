//asignar un nombre y versión al cache //?utm_source=web_app_manifest
var cacheName = 'caching_tarifario-1.7';
var appShellFiles = [
        './',
        './favicon.png',
        './favicon_big.png',
        './splash.png',
        './css/taxiexclusivo.css',
        './js/genesis.jso.js',
        './js/main.jso.js',
        './src/icons/iconApp-128x128.png',
        './src/icons/iconApp-144x144.png',
        './src/icons/iconApp-152x152.png',
        './src/icons/iconApp-192x192.png',
        './src/icons/iconApp-256x256.png',
        './src/icons/iconApp-512x512.png',
        './fonts/nexa/nx_light.eot',
        './fonts/nexa/nx_light.svg',
        './fonts/nexa/nx_light.ttf',
        './fonts/nexa/nx_light.woff',
        './fonts/nexa/nx_light.woff2',
        './fonts/nexa/nx_bold.eot',
        './fonts/nexa/nx_bold.svg',
        './fonts/nexa/nx_bold.ttf',
        './fonts/nexa/nx_bold.woff',
        './fonts/nexa/nx_bold.woff2',
        './src/anunciate.gif',
        './src/tx_exclusivo_banner1.gif',
        './src/tx_exclusivo_banner2.gif'
      ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(appShellFiles);
      })
      .catch((err) => console.log('SW: ', err))
  )
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  // const cacheWhitelist = [CACHING_TARIFARIO]

  e.waitUntil(
    caches.keys()
      .then((arrCatch) => {
        return Promise.all(
          arrCatch.map((index) => {
            //Eliminamos lo que ya no se necesita en cache
            if(index !== appShellFiles) {
              return caches.delete(index)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
});

// //cuando el navegador recupera una url
// self.addEventListener('fetch', (e) => {
//   //Responder ya sea con el objeto en caché o continuar y buscar la url real
//   e.respondWith(
//     caches.match(e.request)
//       .then((res) => {
//         // recuperar del caché o de la url
//         console.log(res, e.request.url)
//         return fetch(e.request.url) || res;
//       })
//   )
// });

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Servicio Worker] Obteniendo recurso: '+ e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Servicio Worker] Almacena el nuevo recurso: '+ e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
