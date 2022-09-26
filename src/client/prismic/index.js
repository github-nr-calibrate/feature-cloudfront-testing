import Prismic from 'prismic-javascript';
import { apiEndpoint, accessToken } from './config';

export const prismicClient = Prismic.client(apiEndpoint, { accessToken });

export async function fetchMeta() {
  const metadata = await prismicClient.getSingle('meta');
  return metadata.data;
}

export async function fetchSingle(docType, options = {}) {
  const [meta, { data }] = await Promise.all([
    fetchMeta(),
    prismicClient.getSingle(docType, options),
  ]);

  return {
    data,
    meta,
  };
}

export async function fetchByUID(uid, params, options = {}) {
  const [meta, { data }] = await Promise.all([
    fetchMeta(),
    await prismicClient.getByUID(uid, params, options),
  ]);

  return {
    data,
    meta,
  };
}

export async function fetchByDocType(type, options) {
  return prismicClient.query(Prismic.Predicates.at('document.type', type), options);
}

export async function fetchAllByDocType(type, options) {
  const allDocs = { results: [] };

  const callPrismicAndAppend = async (page = 1, pageSize = 100) => {
    const eachPage = await prismicClient.query(
      Prismic.Predicates.at('document.type', type),
      { page, pageSize, ...options },
    );
    allDocs.results = allDocs.results.concat(eachPage.results);

    if (eachPage.results.length >= 100) {
      await callPrismicAndAppend(page + 1);
    } else {
      return true;
    }
  };

  await callPrismicAndAppend();
  return allDocs;
}

export function mapStaticPaths(results, param) {
  return results.map((result) => ({ params: { [param]: result.uid } }));
}

export const parseDDColor = colorString => {
  if (colorString === 'none') return 'none';
  const toks = colorString?.split(/\s/);
  if (toks?.length === 1) {
    return colorString.charAt(0).toLowerCase() + colorString.slice(1);
  }
  return `${toks?.[0].toLowerCase()}${toks?.slice(1, toks?.length).join('')}` || 'white';
};

export const parseDDTextColor = colorString => colorString?.toLowerCase() === 'white'
  ? colorString?.toLowerCase()
  : parseDDColor(`Text ${colorString}`);

// Slice's name from selector will come like "Small Plan Slice",
// change them to usual small_plan_slice
export const parseSliceName = (name) => name ? name.toLocaleLowerCase().replace(/ /gi, '_') : null;

export { linkResolver, hrefResolver } from './config';

// Get the data for all FAQ items

// Get data for individual FAQ item
const getFAQ = (uid) => {
  if (!uid) return null;
  const faq = fetchByUID('faq', uid).then(result => result.data);
  return faq;
};

// Get the data for all FAQ items
const fetchItems = async (items) => {
  const faqItems = await Promise.all(items.map(item => {
    if (item?.faq_item) {
      return getFAQ(item.faq_item.uid);
    }
    return item;
  }));
    return faqItems;
};

// Go through all the slices on the page and get the data for the FAQ items
export const fetchFAQs = async (faqSlices) => {
  const faqSlicesWithItems = await Promise.all(faqSlices.map(async (slice) => {
    const { items } = slice;
    const faqItems = await fetchItems(items);
    if (slice.slice_type === 'pricing_faqs') {
      return { ...slice, items: faqItems };
    }
      return slice;
  }));
  return faqSlicesWithItems;
};
