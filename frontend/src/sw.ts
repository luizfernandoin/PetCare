import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';


declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();


registerRoute(
  ({ url }) => url.pathname.startsWith('/api/services'),
  new NetworkFirst({
    cacheName: 'api-services-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutos de cache
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/clinics'),
  new NetworkFirst({
    cacheName: 'api-clinics-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 10 * 60, // 10 minutos de cache
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/users'),
  new NetworkFirst({
    cacheName: 'api-users-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 2 * 60, // 2 minutos de cache
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias de cache
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname === '/api/users/pets',
  new NetworkFirst({
    cacheName: 'api-user-pets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 5 * 60, // 5 minutos
      }),
    ],
  })
);

registerRoute(
  ({ url, request }) => 
    url.pathname.startsWith('/api/pets') && 
    request.method === 'GET',
  new NetworkFirst({
    cacheName: 'api-pets-get-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 10 * 60, // 10 minutos
      }),
    ],
  })
);

