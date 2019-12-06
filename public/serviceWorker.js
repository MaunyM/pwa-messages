const CACHE_NAME = '3winfo-V1';
const FILES= [
    '/',
    'logo.svg',
    'favicon.ico',
    'index.html',
    'manifest.json',
    'logo192.png'
];

self.addEventListener('install', (event) => {
    console.log('installed');
    event.waitUntil(
        fetch('asset-manifest.json')
        .then(res => res.json())
        .then(assetManifest => 
            caches.open(CACHE_NAME)
            .then(cache => cache.addAll([...FILES, ...assetManifest.entrypoints]))
        )
    );
});

self.addEventListener('activate', () => {
    console.log('activated');
});

self.addEventListener('fetch', function (event) {
    //console.log('fetched', event, event.request);
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

self.addEventListener('notificationclick', event => {
    const {notification, action} = event;
    console.log('notification clicked', notification.data.id);

    if (action !== 'close' && notification.data.id === 'TEST_ID') {
        clients.openWindow('post');
    }
    notification.close();
});

self.addEventListener('notificationclose', event => {
    console.log('notification closed');
});

self.addEventListener('push', event => {
    const {data} = event;
    const payload = data.json();
    const options = {
        body: `${payload.client} vous avez reçu la pièce de la marque ${payload.marque}`,
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});