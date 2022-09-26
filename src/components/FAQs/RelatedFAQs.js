import React from 'react';
import PropTypes, { PrismicDoc } from 'types';
import { useTheme } from 'styled-components';
import {
  Box, Flex, Col, Container,
} from 'components/Layout';
import { FAQLink } from '.';

export function RelatedFAQs({ items }) {
  return (
    <>
      <Container pb={[4, 5]}>
        <h1>Related Questions</h1>
      </Container>
      <Box borderTop="1px solid" borderColor="#c4c4c4">
        <Flex as="ul" flexWrap="wrap">
          {items.map(RelatedFAQItem)}
        </Flex>
      </Box>
    </>
  );
}

RelatedFAQs.propTypes = {
  items: PropTypes.arrayOf(PrismicDoc),
};

function RelatedFAQItem({ faq_item }, i) {
  const theme = useTheme();
  const even = i % 2;

  return (
    <Col
      key={faq_item.id}
      as="li"
      span={[12, 6]}
      borderRight={even ? '' : '1px solid'}
      borderBottom="1px solid"
      borderColor="#c4c4c4"
    >
      <FAQLink doc={faq_item} px={theme.grid.margins} borderColor="white" fontSize="18px" fontWeight="500" />
    </Col>
  );
}

RelatedFAQItem.propTypes = {
  faq_item: PrismicDoc,
};
