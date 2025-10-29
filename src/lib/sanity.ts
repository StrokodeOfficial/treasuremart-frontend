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
  return client.fetch(q);
}

export async function fetchProducts(filter = ''){
  const q = `*[_type == "product" ${filter}]{_id,title,slug,price,mrp,images,categories[]->{_id,title,slug}}`;
  return client.fetch(q);
}

export default client;