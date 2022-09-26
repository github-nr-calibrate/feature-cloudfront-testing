import { Theme, pxToRem } from './theme';

function joinQueries(queries) {
  return queries.join(' and ');
}

function query(queries, ...breakpoint) {
  const flatBreakpoints = breakpoint.reduce((acc, val) => acc.concat(val), []);
  const breakpoints = queries.map((query, index) => {
    if (query === 'max-width') {
      return `(${query}: ${pxToRem(Theme.breakpointsMap.get(flatBreakpoints[index]) - 1)})`;
    }
    return `(${query}: ${pxToRem(Theme.breakpointsMap.get(flatBreakpoints[index]))})`;
  });

  return joinQueries(breakpoints);
}

export const lessThan = (breakpoint) => query(['max-width'], breakpoint);
export const moreThan = (breakpoint) => query(['min-width'], breakpoint);
export const between = (...breakpoint) => query(['min-width', 'max-width'], ...breakpoint);
