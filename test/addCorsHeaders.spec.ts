import { describe, expect, it } from 'vitest';
import { addCorsHeaders } from '../src/index';

describe('addCorsHeaders', () => {
  it('should add the correct headers to the response', () => {
    const response = new Response('Test response');
    const expectedHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    const result = addCorsHeaders(response);

    expect(result.status).toEqual(200);
    expect(result.headers.get('Access-Control-Allow-Origin')).toEqual('*');
    expect(result.headers.get('Access-Control-Allow-Methods')).toEqual('GET,POST,OPTIONS');
    expect(result.headers.get('Access-Control-Allow-Headers')).toEqual('Content-Type');
  });

  it('should return the original response if it already has the correct headers', () => {
    const response = new Response('Test response', {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }),
    });

    const result = addCorsHeaders(response);

    expect(result).toBe(response);
    expect(result.status).toEqual(200);
    expect(result.headers.get('Access-Control-Allow-Origin')).toEqual('*');
    expect(result.headers.get('Access-Control-Allow-Methods')).toEqual('GET,POST,OPTIONS');
    expect(result.headers.get('Access-Control-Allow-Headers')).toEqual('Content-Type');
  });
});
