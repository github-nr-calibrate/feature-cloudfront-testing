import React from 'react';
import { RichText as PrismicRichTextProps } from 'types';
import { PrismicRichText, Element } from '@prismicio/react';
import { linkResolver } from 'client/prismic';
import { Link } from 'components/Link';
import Text from './Text';

// Add unique key to props
function propsWithUniqueKey(props, key) {
  return Object.assign(props || {}, { key });
}

function htmlSerializer(type, element, content, children, key) {
  let props = {};

  switch (type) {
    case Element.heading1:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h1', typeStyle: 'h1' }, key), children);
    case Element.heading2:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h2', typeStyle: 'h2' }, key), children);
    case Element.heading3:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h3', typeStyle: 'h3' }, key), children);
    case Element.heading4:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h4', typeStyle: 'h4' }, key), children);
    case Element.heading5:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h5', typeStyle: 'h5' }, key), children);
    case Element.heading6:
      return React.createElement(Text, propsWithUniqueKey({ as: 'h6', typeStyle: 'h6' }, key), children);
    case Element.paragraph:
      return React.createElement(Text, propsWithUniqueKey({ as: 'p', typeStyle: 'bodyL' }, key), children);
    case Element.listItem:
      return React.createElement(Text, propsWithUniqueKey({ as: 'li', typeStyle: 'bodyL' }, key), children);
    case Element.oListItem:
      return React.createElement(Text, propsWithUniqueKey({ as: 'li', typeStyle: 'bodyL' }, key), children);
    case Element.list:
      return React.createElement('ul', propsWithUniqueKey(props, key), children);
    case Element.oList:
      return React.createElement('ol', propsWithUniqueKey(props, key), children);
    case Element.hyperlink:
      const targetAttr = element.data.target ? { target: element.data.target } : {};
      const relAttr = element.data.target ? { rel: 'noopener' } : {};
      props = {
        doc: element.data,
        ...targetAttr,
        ...relAttr,
      };
      return React.createElement(Link, propsWithUniqueKey(props, key), children);

    default:
      return null;
  }
}

function TextField({ children }) {
  return (
    <PrismicRichText
      field={children}
      linkResolver={linkResolver}
      components={htmlSerializer}
    />
  );
}

TextField.propTypes = {
  children: PrismicRichTextProps.isRequired,
};

export default TextField;
