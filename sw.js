const CACHE='revanced-manual-v3.0.1';
const ASSETS=['./','./index.html','./assets/style.css','./assets/app.js','./assets/manual-data.js','./manifest.webmanifest',
'./screenshots/01-diversos.jpg','./screenshots/02-spoof-video-streams.jpg','./screenshots/03-clientes-spoof.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
