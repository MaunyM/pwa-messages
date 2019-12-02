const CACHE_NAME = 'pwa-message-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'logo.svg',
    'favicon.ico',
    'logo192.png'
];

const loadAssetManifest = async function () {
    const res = await fetch("/asset-manifest.json");
    return res.json();
};

self.addEventListener('install', (event) => {
    console.log('👷', 'install', event);
    event.waitUntil(
        loadAssetManifest().then(assetManifest =>
            caches.open(CACHE_NAME).then((cache) => cache.addAll([...urlsToCache, ...assetManifest.entrypoints]))
        )
    )
});

self.addEventListener('activate', (event) => {
    console.log('👷', 'activate', event);
});

self.addEventListener('fetch', function (event) {
    console.log('👷', 'fetch', event);
    const requestURL = new URL(event.request.url);
    if (requestURL.hostname === 'api.larus.fr') {
        event.respondWith(
            caches.open(CACHE_NAME).then(
                (cache) => {
                    return fetch(event.request)
                        .then(
                            function (response) {
                                cache.put(event.request, response.clone());
                                return response;
                            })
                        .catch(() => caches.match(event.request))
                })
        );
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('notificationclose', event => {
    const {notification, action} = event;
    console.log('👷', 'notificationclose', action, notification.data.id);
});

self.addEventListener('notificationclick', event => {
    const {notification, action} = event;
    console.log('👷', 'notificationclick', action, notification.data.id);

    if (action !== 'close' && notification.data.id === 'NEW_MESSAGE') {
        clients.openWindow('post');
    }
    notification.close();
});

self.addEventListener('push', event => {
    console.log('👷', 'push');
    const options = {
        body: "Cette notification a été envoyée à partir d'un push!",
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
