import React from 'react';
import styled from 'styled-components';
import PropTypes, { PrismicDoc } from 'types';
import { Container, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { slugify } from 'utils';
import { MQAbove } from 'styles/mediaQueries';
import { FAQLink } from '.';

function FAQSection({ primary, items }) {
  return (
    <section>
      <Container paddingTop={['2.5rem', '2.875rem', '3.25rem']} paddingBottom={['2.5rem', '2.875rem', '3.25rem']}>
        <GridRow>
          <Box>
            <Heading typeStyle="h2" id={slugify(primary.section_title)}>{primary.section_title}</Heading>
          </Box>
          <Box>
            <FAQList>
              {items.map(({ faq_item }) => (
                <FAQLink as="li" key={faq_item.id} doc={faq_item} />
              ))}
            </FAQList>
          </Box>
        </GridRow>
      </Container>
    </section>
  );
}

const GridRow = styled.div`
  display: grid;

  ${MQAbove.md`
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  `}

  ${MQAbove.lg`
    grid-template-columns: 4fr 6.7fr;
    column-gap: 5rem;
  `}
`;

const Heading = styled(Text)`
  margin-bottom: 3.5rem;

  ${MQAbove.md`
    position: sticky;
    top: 120px;
    margin-bottom: 0;
  `}
`;

const FAQList = styled.ul`
  li:first-child {
    padding-top: 0;
  }
`;

FAQSection.propTypes = {
  primary: PropTypes.shape({
    section_title: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PrismicDoc),
};

export default FAQSection;
