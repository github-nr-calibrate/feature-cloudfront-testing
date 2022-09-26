import React from 'react';
import PropTypes, { PrismicSlice } from 'types';
import { sliceDictionary } from './sliceDictionary';

export function Slice({ data, meta }) {
  let Component = null;

  const { slice_type } = data;
  // Check if slice is valid
  if (sliceDictionary.hasOwnProperty(slice_type)) {
    Component = sliceDictionary[slice_type];
  } else {
    return null;
  }

  return <Component {...data} meta={meta} />;
}

Slice.propTypes = {
  data: PrismicSlice,
  meta: PropTypes.any,
};
