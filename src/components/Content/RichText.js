import React, { useEffect } from 'react';
import { RichText, TextFieldStyle } from 'components/Text';
import styled from 'styled-components';

const RichTextComponent = (data) => {
  useEffect(() => {
    // default all links to open in a new tab
    const links = document.querySelectorAll('a') || [];
    links.forEach((link) => link.setAttribute('target', '_blank'));
  });

  return (
    <TextFieldWithStyles className={data._printable ? 'can-print' : 'no-print'}>
      <RichText>{data.primary.body}</RichText>
    </TextFieldWithStyles>
  );
};

const TextFieldWithStyles = styled(TextFieldStyle)`
  max-width: 700px;
  margin: 0 auto;
  h2 {
    font-family: 'Caslon Doric Condensed',sans-serif;
    font-size: 3em;
    color: var(--color__lavender);
  }
  p {
    font-size: 1.1em;
    line-height: 1.25em;
  }
  p + h2,
  ul + h2 {
    margin: 0.65em 0;
  }
  p + h3,
  ul + h3 {
    margin: 1.5em 0;
  }
  h3 {
    font-size: 1.4em;
  }
  ul {
    font-size: 1.1em;
    line-height: 1.25em;
  }
  p em,
  h2 em,
  h3 em,
  h4 em {
    font-style: italic;
  }
  p:last-of-type {
    margin-bottom: 1.5em;
  }
`;

export default RichTextComponent;
