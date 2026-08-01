// public/sw.js

const CACHE_NAME = 'portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: ['/icons/', '/images/', '/fonts/', '/_next/static/'],
  // Network first for HTML
  html: ['/'],
  // Stale while revalidate for API
  api: ['/api/'],
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http schemes
  if (!url.protocol.startsWith('http')) return;

  // Determine cache strategy
  let strategy = 'network-first';
  
  if (CACHE_STRATEGIES.static.some(path => url.pathname.startsWith(path))) {
    strategy = 'cache-first';
  } else if (CACHE_STRATEGIES.api.some(path => url.pathname.startsWith(path))) {
    strategy = 'stale-while-revalidate';
  } else if (CACHE_STRATEGIES.html.some(path => url.pathname === path || url.pathname.startsWith(path + '#'))) {
    strategy = 'network-first';
  }

  event.respondWith(handleRequest(request, strategy));
});

async function handleRequest(request, strategy) {
  const cache = await caches.open(CACHE_NAME);

  switch (strategy) {
    case 'cache-first': {
      const cached = await cache.match(request);
      if (cached) {
        // Update cache in background
        fetch(request).then(response => {
          if (response.ok) cache.put(request, response.clone());
        }).catch(() => {});
        return cached;
      }
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch {
        return new Response('Offline', { status: 503 });
      }
    }

    case 'network-first': {
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
      }
    }

    case 'stale-while-revalidate': {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request).then(response => {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(() => cached);
      
      return cached || fetchPromise;
    }

    default:
      return fetch(request);
  }
}

// Background sync for contact form
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Implementation for background sync
  console.log('Syncing contact form...');
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'close', title: 'Dismiss' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});