import React from 'react';
import { Link } from 'components/Link';
import PropTypes, { PrismicDoc } from 'types';
import { Text } from 'components/Text';
import { Box } from 'components/Layout';

const StyledButton = React.forwardRef(({
  data,
  mt = '0',
  mb = '0',
  center,
  ...rest
}, ref) => {
  const {
    label,
    doc,
    style,
    ml = center ? 'auto' : '0',
    mr = center ? 'auto' : '0',
    anchor,
  } = data;

  const renderButtonText = (text) => <Text typeStyle="buttonsL" as="span">{text}</Text>;

  // If the target is a popup_form open it in the drawer
  if (doc && doc.type === 'popup_form') {
    return (
      <Box
        as="button"
        className={`button button--${style} ${doc.uid}`}
        mt={mt}
        ml={ml}
        mr={mr}
        mb={mb}
      >
        {renderButtonText(label)}
      </Box>
    );
  }

  return (
    doc.link_type === 'Web' ? (
      <Link
        href={anchor || doc.url}
        rel="noopener noreferrer"
        className={`button button--${style}`}
        mt={mt}
        ml={ml}
        mr={mr}
        mb={mb}
        ref={ref}
        {...rest}
      >
        {renderButtonText(label)}
      </Link>
    ) : (
      <Link
        doc={doc}
        className={`button button--${style}`}
        mt={mt}
        ml={ml}
        mr={mr}
        mb={mb}
        ref={ref}
        {...rest}
      >
        {renderButtonText(label)}
      </Link>
    )
  );
});

StyledButton.propTypes = {
  mt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
  ]),
  mb: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
  ]),
  center: PropTypes.bool,
  data: PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    doc: PrismicDoc,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    fontWeight: PropTypes.string,
    style: PropTypes.string,
    ml: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    mr: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    anchor: PropTypes.string,
  }),
};

export default StyledButton;
