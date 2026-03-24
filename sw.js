
const CACHE_NAME = 'pi-hybrid-v1';
const ASSETS = [
    './',
    './index.html',
    './bayesian_optimization.html',
    './data_pipeline.html',
    './ar-panel.css',
    './ar-panel.js',
    './SoundManager.js',
    './vendor/js/gsap.min.js',
    './vendor/js/ScrollTrigger.min.js',
    './vendor/js/tailwind.min.js',
    './vendor/js/react.production.min.js',
    './vendor/js/react-dom.production.min.js',
    './vendor/js/babel.min.js',
    './vendor/js/lucide-react.js',
    './vendor/js/lucide.js',
    './vendor/css/offline_fonts.css'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching assets');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    // Update cache with new found resources
                    if (event.request.url.startsWith('http') && event.request.method === 'GET') {
                        cache.put(event.request.url, fetchRes.clone());
                    }
                    return fetchRes;
                });
            });
        }).catch(() => {
            if (event.request.url.indexOf('.html') > -1) {
                return caches.match('./index.html');
            }
        })
    );
});
