let toCache = ["/Bagel-PWA/","/Bagel-PWA/bagel.js","/Bagel-PWA/assets/imgs/bagel.png"];self.addEventListener("install", e => {e.waitUntil( caches.open("Bagel.js worker").then(cache => cache.addAll(toCache)));});self.addEventListener("fetch", e => {e.respondWith( caches.match(e.request).then(response => response || fetch(e.request)));});
