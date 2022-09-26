import { css } from 'styled-components';
import { Theme } from 'styles/theme';

// Can be simplified to: const breakpoints = Object.fromEntries(Theme.breakpointsMap);
// with Node.js v14
const breakpoints = {};
for (const key of Theme.breakpointsMap.keys()) {
  breakpoints[key] = Theme.breakpointsMap.get(key);
}

// Custom breakpoint for mobile
breakpoints.xs = 428;
breakpoints.navigation = 1200;

export const MQAbove = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}px) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {},
);

export const MQBelow = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (max-width: ${breakpoints[label] - 1}px) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {},
);
