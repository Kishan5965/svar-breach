self.addEventListener('fetch', event => {
  // Intercept all fetch requests and optionally manipulate them
  event.respondWith(fetch(event.request));
});

console.log('[Svar] Stinger core initialized');