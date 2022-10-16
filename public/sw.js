const PRECACHE = "precache-v8";
const PRECACHE_URLS = [
    "/icons/192.png",
    "/minireset.min.css",
    "/Color.css",
    "/Pretendard.css",
    "/Pretendard/Regular.woff2",
    "/Pretendard/SemiBold.woff2",
    "/cache.html",
];

const RUNTIME = "runtime-{tag}";

self.addEventListener("install", (event) => {
    console.log("install");
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    console.log("activate");
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cache_keys) => {
                return cache_keys.filter((key) => !currentCaches.includes(key));
            })
            .then((delete_keys) => {
                return Promise.all(
                    delete_keys.map((key) => {
                        return caches.delete(key);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log("@", event.request.url);
                    return cachedResponse;
                }

                return fetch(event.request).then((response) => {
                    if (response.ok && event.request.url.includes("assets")) {
                        return caches.open(RUNTIME).then((cache) => {
                            return cache.put(event.request, response.clone()).then(() => {
                                console.log("+", event.request.url);
                                return response;
                            });
                        });
                    }

                    console.log(" ", event.request.url);
                    return response;
                });
            })
        );
    } else {
        console.log("C", event.request.url);
    }
});
