import React from 'react';
import PropTypes, { ReactChild } from 'types';
import { Box } from 'components/Layout';

function ExternalLink({
  children, href, ...rest
}) {
  return (
    <Box as="a" href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </Box>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string,
  children: ReactChild,
};

export default ExternalLink;
