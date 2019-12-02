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
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
