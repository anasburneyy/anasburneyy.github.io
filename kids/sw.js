const CACHE = 'huddle-ba80083369';
const FILES = ["./","./assets/index-BOTz4t9T.js","./assets/esm-BztFMjBF.js","./assets/esm-fY4PkG9s.js","./assets/web-BeIE1Qnl.js","./assets/web-CbrGpkqw.js","./assets/alara-BNLUq9jU.webp","./assets/alara-B_3_Fe64.webp","./assets/ayra-6ghVmuLd.webp","./assets/ayra-C-_MJ3iW.webp","./assets/fredoka-latin-wght-normal-DM6njrJ3.woff2","./assets/head-alara-DCXvngFJ.webp","./assets/head-ayra-D-pn19Pv.webp","./assets/head-izel-ELnWDWsR.webp","./assets/index-EI4o2u3S.css","./assets/izel-C0DQNYE8.webp","./assets/izel-D3NtSZ7Z.webp","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// A tapped "Your turn" alert brings the app's tab back (or opens it).
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((all) =>
      all.length ? all[0].focus() : self.clients.openWindow('./')
    )
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // The page itself comes from the network first, so a new version shows on the very next visit; the saved copy
  // is only for when there's no connection. Everything else has a hashed name, so the saved copy is always right.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./', copy)); }
          return res;
        })
        .catch(() => caches.match('./'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).catch(() => caches.match('./'))
    )
  );
});
