# service-worker


este documento detalla que es un service worker y como actua exactamente dentro de una aplicacion de control de aparcamientos

1. que es el service worker y que hace en mi app?
Un service worker es un script que se ejecuta en segundo plano, en un hilo independiente del navegador y separado de la interfaz visual, actua como un intermediario o proxy: intercepta todas las peticiones http que hace la web para decidir si los recursos se descargan de internet o se cargan desde la cache local,
en una practica en la que hice una aplicacion para guardar el coche llamada parkingrandy, el service worker toma el control de estas peticiones, gracias a esto, mi aplicacion es capaz de funcionar en modo offline, permitiendo que responda aunque me quede sin cobertura movil al bajar al sotano de un aparcamiento

2. el proceso de carga inicial: el precache, durante la instalacion del service worker se ejecuta el precaching, un proceso que obliga al navegador a descargar y guardar los archivos esenciales de la web para garantizar una estructura minima antes de usarla,en mi codigo controlo esto con la instruccion globPatterns: ['/*.{js,css,html,ico,png,svg,woff2}'],
asi fue como consegui que el archivo index.html, la hoja de estilos style.css y los scripts se almacenen internamente en el telefono, por eso, aunque el movil no tenga datos, la pantalla y los botones cargan al acto sin dar el error de "sin conexion"

3. estrategias de cache (workbox)
para gestionar las peticiones web, configure el service worker con tres estrategias distintas de workbox: primero, la stalewhilerevalidate, que sirve un recurso desde la cache al instante y lo actualiza desde internet en segundo plano, la cual aplique en las llamadas a fonts.googleapis.com para que los textos carguen sin retrasos visuales,
segundo, la cachefirst, que busca el archivo exclusivamente en el almacenamiento local y no consume datos, la cual utilice en tile.openstreetmap.org para que las imagenes del mapa de leaflet funcionen sin cobertura, y tercero, la networkfirst, que intenta consultar siempre primero internet para dar el dato mas fresco y usa la cache solo si falla la red,
 la cual se encarga de controlar nominatim.openstreetmap.org para obtener la direccion exacta, sirviendo de salvavidas si no hay senal, todo este ecosistema de estrategias lo estructure de esta manera para dar soporte offline a una actividad que hice, una aplicacion de control de aparcamientos, garantizando que sea rapida y funcional en situaciones reales de desconexion

4. el requisito obligatorio de seguridad (https)
por motivos de seguridad, los navegadores exigen un contexto seguro para activar un service worker, lo que significa que el script unicamente funciona bajo protocolo cifrado https o en localhost, este factor es critico si quiero usar la geolocalizacion precisa del mapa (map.js) o la camara (camera.js) en un movil real,
 como en desarrollo usamos la ip local (ejemplp: 192.168.1.xx), el movil bloquearia el service worker por http normal, por eso utilice el plugin basicssl() en vite, forzando a la app a levantar un servidor https seguro que activa la camara y el mapa en el smartphone al momento,

5. conclusion
en conclusion, el service worker es el motor que convierte mi web en una pwa con comportamiento nativo, al coordinar las estrategias de workbox con los mapas, la camara y el almacenamiento, he conseguido una herramienta rapida, segura y utilizable en situaciones reales de desconexion
