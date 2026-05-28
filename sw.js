// sw.js (service worker)) para la aplicacion de gestion de aparcamientos parkingrandy

// definimos el nombre de la cache para almacenar los archivos locales
const cache_name = 'parkingrandy-cache-v1',

// lista con todas las rutas de los archivos indispensables de nuestra aplicacion
const assets_to_cache = [
  '/',
  '/index.html',
  '/style.css',
  '/src/main.js',
  '/src/map.js',
  '/src/camera.js',
  '/favicon.ico'
],

// evento de instalacion, se activa la primera vez que el navegador registra este script
self.addEventListener('install', (event) => {
  // obligamos al navegador a esperar hasta que todos los recursos esten guardados con exito
  event.waitUntil(
    // abrimos la caja de almacenamiento local especificada en el nombre
    caches.open(cache_name).then((cache) => {
      // descargams de golpe y guardamos todos los archivos del array en la memoria del dispositivo
      return cache.addAll(assets_to_cache),
    })
  ),
}),

// evento fetch, intercepta de forma automatica cada peticion de red que realiza la aplicacion
self.addEventListener('fetch', (event) => {
  // indicamos al navegador como debe responder a la peticion interceptada
  event.respondWith(
    // buscamos si el recurso solicitado ya existe guardado dentro de nuestra cache local
    caches.match(event.request).then((response) => {
      // si el archivo ya esta en la memoria lo servimos al instante para dar soporte offline
      // si no esta en la cache local dejamos que vaya a buscarlo de forma normal a internet
      return response || fetch(event.request),
    })
  ),
}),
