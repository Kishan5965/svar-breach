// guardian-core.js — Core Guardian Module

console.log('[Svar Guardian] Core guardian initialized');

// Attach to SvarState
if (typeof self.SvarState !== 'undefined') {
  self.SvarState.guardians.push('core');
  self.SvarState.codex.coreGuardian = {
    status: 'active',
    lastUpdated: new Date().toISOString(),
    purpose: 'Respond to status queries and maintain heartbeat presence'
  };
}

// Listen for message events (can be expanded for commands)
self.addEventListener('message', event => {
  if (event.data === 'status') {
    event.ports[0].postMessage({
      state: self.SvarState,
      timestamp: new Date().toISOString()
    });
  }
});
