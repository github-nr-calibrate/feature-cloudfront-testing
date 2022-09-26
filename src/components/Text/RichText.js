import React, { useEffect } from 'react';
import { slugify } from 'utils';
import PropTypes, { RichText as PrismicRichTextProps, ReactChild } from 'types';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';
import { Link } from 'components/Link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Text } from '.';

const InlineButton = styled.button`
  font-size: inherit;
  padding: 0;
  text-decoration: underline;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

function RichText({
 children, as, raw, ...rest
}) {
  const router = useRouter();

  const isActive = (item) => {
    const path = router.asPath;
    if (!item) {
      return false;
    }
    if (path.replace(/\//g, '').includes(item.replace(/\//g, ''))) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const footnotes = document.querySelectorAll('.footnote');
    footnotes.forEach((footnote, index) => {
      // Safari and Chrome
      const parent = footnote.parentElement;
      if (parent.tagName === 'A') {
        footnote.innerHTML = `${footnote.innerHTML }<sup class='footnote__link'><a href='${parent.href}' aria-label='View citation for: ${parent.innerText}'>${ index + 1 }</a></sup>`;
        parent.replaceWith(...parent.childNodes);
      }

      // Firefox orders the HTML elements differently
      const { firstChild } = footnote;
      if (firstChild.tagName === 'A') {
        footnote.innerHTML = `${firstChild.innerHTML}<sup class='footnote__link'><a href='${firstChild.href}' aria-label='View citation for: ${firstChild.innerText}'>${ index + 1 }</a></sup>`;
      }
    });
  }, []);

  const customLink = (element, content) => {
    const doctype = element.data.type;
    return (
      doctype === 'popup_form' ? (
        <InlineButton className={element.data.uid} key={element.data.uid}>
          {content}
        </InlineButton>
      ) : (
        <Link key={element.data.id} doc={element.data} className={isActive(element.data.uid) ? 'isCurrentPage' : ''}>
          {content}
        </Link>
      )
    );
  };

  // Add in custom serializer to add anchor links to H tags, other adjustments as well
  const htmlSerializer = function (type, element, content, children) {
    // Prismic nests <p> tags into everything so we just want the raw content here
    if (type === 'paragraph' && raw) {
      return <>{children}</>;
    }

    // Replicate default oEmbed HTML structure and behavior here,
    // but add className to style the container correctly
    if (type === 'embed') {
      return (
        <div
          className={`embed ${element.oembed.provider_name === 'YouTube' ? 'embed-youtube' : ''}`}
          data-oembed={element.oembed.embed_url}
          data-oembed-type={element.oembed.type}
          data-oembed-provider={element.oembed.provider_name}
          dangerouslySetInnerHTML={{ __html: element.oembed.html }}
        />
      );
    }

    // Heading 'children' returns 'react.element' which isn't appropriate for generateId function,
    // instead of that use 'element' with element.text value for generateId function
    switch (type) {
      case 'heading1': // Heading 1
        return <h1 id={generateId(element)} key={generateId(element)} className="anchor-link">{children}</h1>;

      case 'heading2': // Heading 2
        return <h2 id={generateId(element)} key={generateId(element)} className="anchor-link">{children}</h2>;

      case 'heading3': // Heading 3
        return <h3 id={generateId(element)} key={generateId(element)} className="anchor-link">{children}</h3>;

      case 'hyperlink': // Link
        return customLink(element, children);

      default: // Always include a default that returns null
        return null;
    }
  };

  const generateId = ({ text }) => {
    if (text?.length > 0) {
      return slugify(text);
    }
    return null;
  };

  const generateHeaderId = (type, text) => {
    if (type && type.startsWith('h')) {
      return slugify(prismicH.asText(text));
    }
    return null;
  };

  const generateClassName = (type, rest) => {
    if (type && type.startsWith('h')) {
      return `anchor-link ${rest.className || ''}`;
    }
    return rest.className;
  };

  // Add ID and className to all headings for anchor links
  return (
    <Text {...rest} as={raw ? 'span' : as || 'div'} id={generateHeaderId(as, children)} className={generateClassName(as, rest)}>
      {typeof (children) === 'string' ? children
        : (
          <PrismicRichText
            field={children}
            components={htmlSerializer}
          />
      )}
    </Text>
  );
}

RichText.propTypes = {
  children: PropTypes.oneOfType([PrismicRichTextProps, ReactChild]),
  as: PropTypes.string,
  raw: PropTypes.bool,
};

export default RichText;
