import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Node 18+ has global fetch; if not available, polyfill using undici
if (typeof fetch === 'undefined') {
  const { fetch: undiciFetch } = await import('undici');
  // @ts-ignore
  global.fetch = undiciFetch;
}

// no-op export to keep as ESM module
export const _polyfilled = true;
