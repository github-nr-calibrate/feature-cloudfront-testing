import PropTypes from 'prop-types';

export const ReactChild = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const RichText = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    spans: PropTypes.array,
  }),
);

export const PrismicBoolean = PropTypes.boolean;

export const PrismicLink = PropTypes.shape({
  url: PropTypes.string,
  text: PropTypes.string,
});

export const PrismicMediaLink = PropTypes.shape({
  kind: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string,
  link_type: PropTypes.string,
});

export const PrismicImage = PropTypes.shape({
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  alt: PropTypes.string,
  copyright: PropTypes.string,
  url: PropTypes.string,
});

export const PrismicSlice = PropTypes.shape({
  slice_type: PropTypes.string,
  slice_label: PropTypes.string || null,
  items: PropTypes.arrayOf(PropTypes.object),
  primary: PropTypes.object,
});

export const PrismicDoc = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string,
  lang: PropTypes.string,
  uid: PropTypes.string,
  data: PropTypes.object,
  link_type: PropTypes.string,
  isBroken: PropTypes.bool,
});

export default PropTypes;
