
CACHE_NAME = "3WINFO-V1";
FILES = [
    '/',
    'favicon.ico',
    'index.html',
    'logo.svg',
    'logo192.png',
    'logo512.png',
    'manifest.json',
]

self.addEventListener('install', (event) => {
    console.log('install');
    event.waitUntil(
        // DANS build/asset-manifest, on récupère les entry-points pour les fichiers Webpack
        fetch('asset-manifest.json').then(
            res => res.json()).then(
                assetManifest =>
                caches.open(CACHE_NAME).then(
                    (cache) => {
                        return cache.addAll([...FILES, ...assetManifest.entrypoints]);
                    }
                )
            )
    );
});

self.addEventListener('activate', () => {
    console.log('activate');
});

self.addEventListener('notificationclick', (event) => {
    const {notification, action} = event;
    if (action !== "close" && notification.data.id === 'NEW_MESSAGE') {
        clients.openWindow('post');
    }
    notification.close();
});

self.addEventListener('push', (event) => {
    const {data} = event;
    payload = data.json();
    const options = {
        // body: data.text()
        body: `Monsieur ${payload.name} vous avez reçu une pièce de moto ${payload.honda}`
    }
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});


self.addEventListener('fetch', (event) => {


    event.respondWith(
        // caches.match(event.request).then(response => response || fetch(event.request))
        caches.match(event.request).then(response => response || fetch(event.request).then(
            (response) => {
                if (event.request.method === "GET") {
                    caches.open(CACHE_NAME).then(
                        (cache) => {
                            // console.log("===== event.request.method =====");
                            // console.log(event.request);
                            if (event.request.method === "GET") {
                                return cache.put(event.request, response);
                            }
                            else {
                                return response;
                            }

                        }
                    )
                }
            }
        ))
    )


});