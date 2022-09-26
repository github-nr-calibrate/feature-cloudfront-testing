import React from 'react';
import PropTypes, { RichText as PrismicRichText, PrismicLink } from 'types';
import { ParentBlock } from 'components/ParentBlock';
import {
  slugify, hasText, isEmpty, smoothScrollIntoView,
} from 'utils';
import styled from 'styled-components';
import { RichText } from 'components/Text';
import { ThemeBlock } from 'components/ThemeBlock';

const calculateMargin = (alignment) => {
  switch (alignment) {
    case 'left':
      return '0';
    case 'right':
      return '0 0 0 auto';
    default:
      return 'auto';
  }
};

const Container = styled.div`
  max-width: 34rem;
  margin: ${({ alignment }) => (calculateMargin(alignment))};

  header {
    text-align: ${({ alignment }) => (alignment)};
    margin-bottom: 10px;
  }
`;

const List = styled.ol`
  list-style: none;
  font-size: 1.125rem;
  text-align: left;
  list-style-position: outside;
  padding: 1.875rem 1.875rem 1.875rem 3.125rem;
  counter-reset: PrimaryItem;
  background: white;
  color: var(--color__nightshade);
  border: 1px solid rgba(0, 0, 0, 0.1);

  li + li {
    margin-top: 0.5rem;
  }

  .TableOfContents__PrimaryItem {
    counter-increment: PrimaryItem;
  }

  .TableOfContents__PrimaryItem:before {
    content: counters(PrimaryItem, ".") ". ";
    margin-left: -20px;
  }

  .TableOfContents__SecondaryItem {
    margin-left: 10px;
    counter-increment: SecondaryItem;

    &:before {
      content: counter(PrimaryItem) "." counter(SecondaryItem, lower-alpha) ". ";
    }

    + .TableOfContents__PrimaryItem {
      counter-reset: SecondaryItem;
    }
  }

  a {
    text-decoration: underline;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }
`;

function TableOfContents({ primary, items }) {
  const { align_text, heading } = primary;

  return (
    !isEmpty(items) && (
    <ThemeBlock>
      <ParentBlock primary={primary} basic>
        <Container alignment={align_text}>
          {hasText(heading) && (
            <header>
              <RichText
                as="header"
                typeStyle="h2"
              >
                {heading}
              </RichText>
            </header>
          )}
          <List>
            {items.map(({ text, text_override, sub_item }, index) => (
              hasText(text) && (
              <li key={index} className={sub_item ? 'TableOfContents__SecondaryItem' : 'TableOfContents__PrimaryItem'}>
                <a
                  href={`#${slugify(text)}`}
                  onClick={(e) => smoothScrollIntoView(e, `${slugify(text)}`)}
                  aria-label={`Jump to "${text}"`}
                >
                  {text_override || text}
                </a>
              </li>
              )
            ))}
          </List>
        </Container>
      </ParentBlock>
    </ThemeBlock>
    )
  );
}

TableOfContents.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicRichText,
    body_copy: PrismicRichText,
    cta_button_label: PrismicRichText,
    cta_button_link: PrismicLink,
    background_color: PropTypes.string,
    align_text: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    text_override: PropTypes.string,
    sub_item: PropTypes.bool,
  })),
};

export default TableOfContents;
