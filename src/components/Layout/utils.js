export const trimUnit = (s) => s.replace(/([\d,.])+(\S+)?/, '$2').trim();

export const transformProp = (transform) => (prop) => {
  if (Array.isArray(prop)) {
    return (prop).map(transform);
  }

  if (prop instanceof Object) {
    const init = {};
    return Object.entries(prop).reduce((accumulator, [key, value]) => {
      if (value !== undefined) {
        accumulator[key] = transform(value);
      }
      return accumulator;
    }, init);
  }

  return transform(prop);
};

export const calcSpan = (columns) => transformProp((value) => {
  const int = typeof value === 'string' ? Number.parseInt(value, 10) : value;
  return `${(int / columns) * 100}%`;
});

export const calcGutter = (isRow) => transformProp((gap) => {
  const index = isRow ? -1 : 1;

  if (typeof gap === 'string') {
    const [value, unit] = [Number.parseFloat(gap), trimUnit(gap)];
    return value / (2 * index) + unit;
  }

  return gap / (2 * index);
});

export const calcRowGutter = calcGutter(true);
export const calcColGutter = calcGutter(false);

export const flexBasis = transformProp((value) => `0 0 ${value}`);
