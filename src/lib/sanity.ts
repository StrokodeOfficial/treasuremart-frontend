import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID

if (!PROJECT_ID) {
    console.warn("SANITY PROJECT ID not found")
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});


const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);


export async function fetchCategories(){
  const q = `*[_type == "category" && !defined(parent)]{_id,title,slug,description,cover}`;
  try {
    return await client.fetch(q);
  } catch (err) {
    // Network or client errors should not crash the dev server — return an empty array and log
    // This avoids unhandled rejections bubbling into Vite/Astro when Sanity is unreachable.
    // The original error (EAI_AGAIN) indicates DNS/network issues; surface a helpful message.
    // eslint-disable-next-line no-console
    console.error('[sanity] fetchCategories failed:', err && err.message ? err.message : err);
    return [];
  }
}

export async function fetchProducts(filter = ''){
  const q = `*[_type == "product" ${filter}]{_id,title,slug,price,mrp,images,categories[]->{_id,title,slug}}`;
  try {
    return await client.fetch(q);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[sanity] fetchProducts failed:', err && err.message ? err.message : err);
    return [];
  }
}

export default client;