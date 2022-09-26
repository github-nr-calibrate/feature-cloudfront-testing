import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicLink, PrismicImage } from 'types';
import {
  Box, Col, Row, Container, Flex,
} from 'components/Layout';
import { RichText } from 'components/Text';
import { useMatchMedia, useCta } from 'utils/hooks';
import { lessThan } from 'styles/media';
import StyledButton from 'components/Button/StyledButton';
import CardStack from './CardStack';

const CardStackSection = ({ primary, items }) => {
  const {
    heading,
    body_copy,
    card_stack_side,
  } = primary;

  const cta = useCta(primary);
  const isMobile = useMatchMedia(lessThan('md'));
  const sideOrders = card_stack_side ? [1, 0] : [0, 1];

  return (
    <Box bg="grey" position="relative">
      <Flex
        position="absolute"
        justifyContent="center"
        width="100%"
        height="100%"
        zIndex="0"
        opacity={[0,, 1]}
        top="0"
        left="0"
      >
        <Box height="100%" width="1px" bg="border" />
      </Flex>
      <Container py="3rem">
        <Row>
          <Col
            span={[12,, 5]}
            order={[1,, sideOrders[0]]}
            offset={[0,, sideOrders[0] ? 2 : 0]}
            pt="5"
            minHeight={['32rem',, 'auto']}
          >
            <CardStack items={items} height="100%" />
          </Col>
          <Col
            order={[0,, sideOrders[1]]}
            span={[12,, 5]}
            offset={[0,, sideOrders[1] ? 2 : 0]}
            minHeight="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <RichText typeStyle="subhead" pb="4">{heading}</RichText>
            <RichText
              typeStyle="bodyM"
              pb="4"
              color="textMediumDark"
            >
              {body_copy}
            </RichText>
            {!isMobile && (
              <Flex justifyContent={['center',, 'flex-start']}>
                {cta && (
                <StyledButton
                  data={cta}
                  mt="1.25rem"
                />
                )}
              </Flex>
            )}
          </Col>
        </Row>
        {isMobile && (
          <Flex justifyContent={['center',, 'flex-start']} mt="3rem">
            {cta && (
            <StyledButton
              data={cta}
              mt="1.25rem"
            />
            )}
          </Flex>
        )}
      </Container>
    </Box>
  );
};

CardStackSection.propTypes = {
  primary: PropTypes.shape({
    card_stack_side: PropTypes.bool,
    heading: PrismicText,
    body_copy: PrismicText,
    button_label: PrismicText,
    button_link: PrismicLink,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    card: PrismicImage,
  })),
};

export default CardStackSection;
