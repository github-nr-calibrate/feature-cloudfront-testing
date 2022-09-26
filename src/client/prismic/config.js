/**
 * Prismic API endpoint
 * Determines which repository to query and fetch data from
 */
export const apiEndpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'https://calibrate-staging.prismic.io/api/v2' : 'https://calibrate.cdn.prismic.io/api/v2';

/**
 * Access Token
 * Token generated in Prismic dashboard
 */
export const accessToken = '';

/**
 * Link resolution rules
 * Manages the url links to internal Prismic documents
 */
export const linkResolver = (doc) => {
  switch (doc.type) {
    case 'how_it_works_page':
      return '/how-it-works';
    case 'about_page':
      return '/about-us';
    case 'reviews_page':
      return '/reviews';
    case 'pricing_page':
      return '/pricing';
    case 'faqs_page':
      return '/faqs';
    case 'medication':
      return '/medication';
    case 'faq':
      return `/faqs/${doc.uid}`;
    case 'legal':
      return `/legal/${doc.uid}`;
    case 'content_item':
      return `/tnetnoc/${doc.uid}`;
    case 'blog':
      return '/resources';
    case 'blog_post':
      return `/resources/${doc.uid}`;
    case 'app':
      return `/app/${doc.uid}`;
    case 'landing_page':
      return `/lp/${doc.uid}`;
    case 'focused_type':
      return `/pages/${doc.uid}`;
    case 'medications':
      return `/medications/${doc.uid}`;
    default:
      return '/';
  }
};

/**
 * Additional helper function for Next/Link components
 */
export const hrefResolver = (doc) => {
  switch (doc.type) {
    case 'how_it_works_page':
      return '/how-it-works';
    case 'about_page':
      return '/about-us';
    case 'reviews_page':
      return '/reviews';
    case 'pricing_page':
      return '/pricing';
    case 'faqs_page':
      return '/faqs';
    case 'medication':
      return '/medication';
    case 'faq':
      return '/faqs/[uid]';
    case 'legal':
      return '/legal/[doc]';
    case 'content_item':
      return '/tnetnoc/[doc]';
    case 'blog':
      return '/resources';
    case 'blog_post':
      return '/resources/[doc]';
    case 'app':
      return '/app/[doc]';
    case 'landing_page':
      return '/lp/[uid]';
    case 'focused_type':
      return '/pages/[uid]';
    case 'medications':
      return '/medications/[uid]';
    default:
      return '/';
  }
};
