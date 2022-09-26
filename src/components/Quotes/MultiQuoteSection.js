import React from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import {
  Box, Row, Col, Flex,
} from 'components/Layout';
import { RichText, Text } from 'components/Text';
import { ParentBlock } from 'components/ParentBlock';
import { hasText } from 'utils';

function MultiQuoteSection({ primary, items }) {
  // Primsic data
  const {
    legal_text,
    padding_top,
    padding_bottom,
    cta_color,
  } = primary;

  // padding set at slice level (defaut: LARGE)
  const pt = padding_top === 'SMALL' ? '4.5rem' : '7.25rem';
  const pb = padding_bottom === 'SMALL' ? '4.5rem' : '7.25rem';

  return (
    <ParentBlock
      primary={primary}
      paddingTop={pt}
      paddingBottom={pb}
    >
      <Row py="2rem" mt={['2.25rem',, '5.75rem']} position="relative">
        <Flex
          opacity={[0,, 1]}
          height="100%"
          width="100%"
          position="absolute"
          zIndex="0"
          top="0"
          left="0"
          justifyContent="space-evenly"
        >
          <Box height="100%" width="1px" bg="rgba(0,0,0,0.2)" />
          <Box height="100%" width="1px" bg="rgba(0,0,0,0.2)" />
        </Flex>
        {items.map(({ quote, attr }, index) => (
          <Col
            span={[12,, 4]}
            key={`multi_quote_${attr}_${index}`}
            display="flex"
            flexDirection="column"
            minHeight="100%"
            justifyContent="space-between"
            pb={[index < items.length - 1 ? 4 : 0,, 0]}
            textAlign="center"
          >
            <RichText typeStyle="bodyM" pb={['1.5rem',, '1.875rem']}>
              {quote}
            </RichText>
            <Flex justifyContent="center" color="lavenderLight">
              <Box
                as="img"
                src="/icons/triangle.svg"
                pb="3px"
                mr="2"
                aria-hidden
              />
              <Text my="0" typeStyle="bodyM" fontWeight="500 !important" color={cta_color || 'lavender'}>{attr}</Text>
            </Flex>
          </Col>
        ))}
      </Row>
      {hasText(legal_text) && (
      <Row pt={['3.5rem',, '8rem']}>
        <Col>
          <Box width="100%" textAlign="center">
            <RichText color="textLight" typeStyle="bodyM">{legal_text}</RichText>
          </Box>
        </Col>
      </Row>
      )}
    </ParentBlock>
  );
}

MultiQuoteSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    body_copy: RichTextType,
    legal_text: RichTextType,
    padding_top: PropTypes.string,
    padding_bottom: PropTypes.string,
    cta_color: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    quote: RichTextType,
    attr: RichTextType,
  })),
};

export default MultiQuoteSection;
