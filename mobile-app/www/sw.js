const CACHE_NAME = 'pi-hybrid-v2';

// All project files to cache
const CORE_ASSETS = [
    './',
    'index.html',
    'manifest.json',
    'bayesian_optimization.html',
    'data_pipeline.html',
    'data_odyssey.html',
    'layers/layer0-input.html',
    'layers/layer1-conv1d.html',
    'layers/layer2-batchnorm.html',
    'layers/layer3-relu.html',
    'layers/layer4-dropout1.html',
    'layers/layer5-bilstm.html',
    'layers/layer6-dropout2.html',
    'layers/layer7-dense.html',
    'layers/layer8-relu2.html',
    'layers/layer9-output.html',
    'layers/layer10-regression.html'
];

// External CDN assets that need caching
const CDN_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@200;300;400;600;800&family=Outfit:wght@200;400;600;900&display=swap'
];

// Install: Cache all core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching core assets...');
            return cache.addAll(CORE_ASSETS).then(() => {
                console.log('[SW] Core assets cached!');
                // Cache CDN assets one by one (don't fail if one fails)
                return Promise.allSettled(
                    CDN_ASSETS.map(url =>
                        fetch(url, { mode: 'cors' })
                            .then(response => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            })
                            .catch(err => console.log('[SW] CDN cache skip:', url))
                    )
                );
            });
        })
    );
    self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch: Cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Cache new requests dynamically (fonts, font files, etc.)
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Offline fallback
                if (event.request.destination === 'document') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
