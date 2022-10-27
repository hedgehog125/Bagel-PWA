let index = location.href.split("/");
index.pop();
const toCache = [index = index.join("/") + "/", ...["bagel.js", "assets/imgs/bagel.png", "assets/imgs/icons/128x128.png", "assets/imgs/icons/144x144.png", "assets/imgs/icons/152x152.png", "assets/imgs/icons/192x192.png", "assets/imgs/icons/256x256.png", "assets/imgs/icons/512x512.png", "manifest.json", "worker.js"].map(href => index + href)];
self.addEventListener("install", e=>{
    self.skipWaiting()
}
);
self.addEventListener("fetch", e => {
    e.respondWith(
        (async _ => {
            let exists = await caches.has("Bagel.js Bagel");
            let cache = await caches.open("Bagel.js Bagel");
            let cached = await cache.match(e.request);
            if (cached) return cached;
        
            let resource;
            try {
                resource = await fetch(e.request);
            }
            catch (error) {
                console.warn("A Bagel.js service worker failed to fetch " + e.request.url + ". Request:");
                console.log({
                    ...e.request
                });
                if (e.request.url == index) {
                    return new Response(exists? "Where'd the cached file go?" : "Where'd the cache go?");
                }
            }
            if (toCache.includes(e.request.url)) {
                e.waitUntil(cache.put(e.request, resource.clone())); // Update it in the background
            }
            return resource;
        })()
    );
});
