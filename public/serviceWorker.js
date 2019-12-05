
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

self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    )

    // Cache only
    // caches.open(CACHE_NAME).then(cache =>
    //     event.respondWith(
    //         cache.match(event.request).then(response => response || fetch(event.request))
    //     )
    // );




});