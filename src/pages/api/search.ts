import type { APIRoute } from 'astro';
import client from '../../lib/sanity';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const limit = Number(url.searchParams.get('limit') || '8');

  if (!q || q.trim().length < 1) {
    return new Response(JSON.stringify({ results: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const term = q.replace(/\*/g, '');
  try {
    const results = await client.fetch(`*[_type == "product" && (title match $t || slug.current match $t || tags[]->title match $t)][0...${limit}]{_id,title,"slug":slug.current, images[0]{asset}}`, { t: `*${term}*` });
    return new Response(JSON.stringify({ results }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ results: [], error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
