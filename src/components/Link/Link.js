import React from 'react';
import PropTypes, { ReactChild, PrismicDoc } from 'types';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import { hrefResolver, linkResolver } from 'client/prismic';
import { Box } from 'components/Layout';
import qs from 'qs';
import ExternalLink from './ExternalLink';

function Link({
  children, href, doc, ...rest
}) {
  const router = useRouter();
  if (!doc && !href) return <Box as="div" {...rest}>{children}</Box>;

  const utmParameters = Object.entries(router.query)
    .reduce((params, param) => {
      const [key, val] = param;
      if (key.startsWith('utm_')) params[key] = val;
      return params;
    }, {});

  const utmString = qs.stringify(utmParameters);

  // Handle Prismic web links
  if (doc && doc.link_type === 'Web') {
    return <ExternalLink href={utmString ? `${doc.url}?${utmString}` : doc.url} target={doc.target} {...rest}>{children}</ExternalLink>;
  }

  // Handle empty links
  if (doc && doc.link_type === 'Any') {
    return <Box as="div" {...rest}>{children}</Box>;
  }

  // Handle extrnal links
  if (href && href?.indexOf('http') !== -1 || href && href?.indexOf('mailto:') !== -1) {
    return <ExternalLink href={utmString ? `${href}?${utmString}` : href} {...rest}>{children}</ExternalLink>;
  }

  // If URL is hard-coded as "/something", remove head/tail "/" char
  const resolve = doc || { type: href.replace(/^\/|\/$/g, '') };

  if (href && href.startsWith('/')) {
    return (
      <NextLink href={`${href}?${utmString}`} as={`${href}?${utmString}`} passHref prefetch={false}>
        <Box as="a" {...rest}>
          {children}
        </Box>
      </NextLink>
    );
  }

  // Handle media links
  if (doc?.link_type === 'Media') {
    return (
      <Box as="a" href={doc.url} {...rest}>
        {children}
      </Box>
    );
  }

  // If the target is a popup_form add the correct className
  if (doc?.type === 'popup_form') {
    return (
      <Box {...rest}>
        <Box as="button" className={doc.uid} key={doc.uid}>
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <NextLink
      as={{
        pathname: linkResolver(resolve),
        query: utmParameters,
      }}
      href={{
        pathname: hrefResolver(resolve),
        query: utmParameters,
      }}
      passHref
      prefetch={false}
    >
      <Box as="a" {...rest}>
        {children}
      </Box>
    </NextLink>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  doc: PrismicDoc,
  children: ReactChild,
  newTab: PropTypes.bool,
  alt: PropTypes.string,
  component: PropTypes.any,
};

export default Link;
