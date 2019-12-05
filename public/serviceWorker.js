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

self.addEventListener('fetch', (event) => {
    //console.log('fetched', event, event.request);
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    )
});