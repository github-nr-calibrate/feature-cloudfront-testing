import React from 'react';
import PropTypes, { PrismicSlice } from 'types';
import { Flex } from 'components/Layout';
import { isEmpty } from 'utils';
import { Slice } from './Slice';
import { sliceDictionary } from './sliceDictionary';

function SliceZone({ slices, custom = [], meta }) {
  if (!slices) return null;

  // DO NOT OVERWRITE EXISTING SLICES
  if (custom.length) {
    custom.forEach((slice) => {
      sliceDictionary[slice.type] = slice.Component;
    });
  }

  return (
    <Flex flexDirection="column" as="main" id="main">
      {slices.map((slice, index) => (
        <section
          key={slice.slice_type + index}
          className={`
          section-theme--${slice.primary?.color_theme ? slice.primary?.color_theme : 'light'} 
          ${slice.slice_type}
          ${!isEmpty(slice.items) ? 'has-items' : ''}
          `}
        >
          <Slice data={slice} meta={meta} />
        </section>
      ))}
    </Flex>
  );
}

SliceZone.propTypes = {
  slices: PropTypes.arrayOf(PrismicSlice),
  custom: PropTypes.array,
  meta: PropTypes.object,
};

export default SliceZone;
