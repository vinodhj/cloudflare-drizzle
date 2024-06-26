// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
  it('responds with Not found! (unit style)', async () => {
    const request = new IncomingRequest('http://example.com');
    // Create an empty context to pass to `worker.fetch()`.
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    expect(await response.text()).toMatchInlineSnapshot(`"Not found"`);
  });

  it('responds with Not found! (integration style)', async () => {
    const response = await SELF.fetch('https://example.com');
    expect(await response.text()).toMatchInlineSnapshot(`"Not found"`);
  });

  it('returns a response for /dizzle-insert', async () => {
    const request = new IncomingRequest('http://example.com/dizzle-insert', { method: 'GET' });
    // Create an empty context to pass to `worker.fetch()`.
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);

    const result: any = await response.json();
    expect(response.status).toEqual(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toEqual('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toEqual('GET,POST,OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toEqual('Content-Type');
    expect(result.msg).toEqual('Inserted successfully');
    expect(result.response).toEqual({
      id: expect.any(Number),
      fullName: expect.any(String),
      phone: expect.any(String),
    });
  });

  it('returns a response for /dizzle-read', async () => {
    const request = new IncomingRequest('http://example.com/dizzle-read', { method: 'GET' });
    // Create an empty context to pass to `worker.fetch()`.
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);

    const result: any = await response.json();
    expect(response.status).toEqual(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toEqual('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toEqual('GET,POST,OPTIONS');
    expect(response.headers.get('Access-Control-Allow-Headers')).toEqual('Content-Type');
    expect(result.msg).toEqual('Read successfully');
    expect(result.response[0]).toMatchObject({
      fullName: expect.any(String),
      phone: expect.any(String),
    });
  });
});
