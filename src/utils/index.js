import { scrollIntoView } from 'seamless-scroll-polyfill'; // scrollIntoView polyfill for Safari support
import * as prismicH from '@prismicio/helpers';

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function mod(n, m) {
  return ((n % m) + m) % m;
}

export function wrap(val, min, max) {
  const range = max - min;
  return mod(val - min, range) + min;
}

export function toPriceString(price) {
  return `$${(Math.ceil(price / 100)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function slugify(text) {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

export const deProp = (props = []) => (prop) => !props.includes(prop);

export function isEmpty(obj) {
  if (obj === null || obj === undefined) {
    return true;
  }

  // Check if all keys are empty
  if (Object.keys(obj).length === 1) {
    const isNull = Object.values(obj[0]).every(value => {
      if (value === null) {
        return true;
      }
      // Check for empty RichText
      if (typeof value === 'object' && Object.keys(value).length === 0) {
        return true;
      }
      // Check for empty links
      if (typeof value === 'object' && value.link_type === 'Any') {
        return true;
      }
      return false;
    });
    return isNull;
  }

  return Object.keys(obj).length === 0;
}

// Helper function for testing if Prismic RichText node has text
export function hasText(item) {
  if (!item) return false;
  if (item.length === 0) {
    return false;
  } if (item.length > 0 && item[0].text !== '') {
    return true;
  }
  return false;
}

export const smoothScrollIntoView = (e, text) => {
  const element = document.getElementById(text);
  e && e.preventDefault();
  if (element) {
    scrollIntoView(element, { behavior: 'smooth', block: 'start' });
    element.tabIndex = -1;
    element.focus({ preventScroll: true });
  }
};

export const generateId = (text) => slugify(prismicH.asText(text));
