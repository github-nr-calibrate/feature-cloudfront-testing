// RichText field from Prismic
export const isRichText = (obj) => (
  obj
  && typeof obj === 'object'
  && obj.hasOwnProperty('type')
  && obj.hasOwnProperty('text')
  && obj.hasOwnProperty('spans')
);
