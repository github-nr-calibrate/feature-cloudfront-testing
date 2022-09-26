import React, { useState, useEffect } from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import {
  Container, Box, Row, Col, Flex,
} from 'components/Layout';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { useInView } from 'react-hook-inview';
import { PrismicRichText } from '@prismicio/react';
import styled from 'styled-components';
import { ThemeBlock } from 'components/ThemeBlock';
import { SmallPlan } from './SmallPlan';
import { Text } from '../Text';
import { Divider } from '../Divider';
import { featuresSerializer, Plan, PricingPlanProps } from './Plan';

const sortByFeatured = ({ featured }) => (featured ? -1 : 1);

const Wrapper = styled(Box)`
  margin-top: 1rem;
  &>* {
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    margin: ${({ isMobile }) => (isMobile ? '-0.75rem' : '-2rem')};
    li{
      width: ${({ canAlign, alignQuantity }) => (canAlign ? `calc(100% / ${alignQuantity})` : '')};
      margin: ${({ isMobile }) => (isMobile ? '0.75rem' : '2rem')};
    }
  }
`;

function SmallPlanSlice({ primary, items }) {
  const {
    pricing_title,
    pricing_features,
    color_theme,
  } = primary;

  const isMobile = useMatchMedia(lessThan('lg'));
  const [pricePlans, setPricePlans] = useState(items);
  const [container, inView] = useInView({ unobserveOnEnter: true });

  const animIndicies = [...items]
    .map(({ featured }, index) => ({ featured, index }))
    .sort(sortByFeatured)
    .reduce((result, { index }, order) => {
      result[index] = order;
      return result;
    }, {});

  useEffect(() => {
    if (isMobile) {
      setPricePlans([...items].sort(sortByFeatured));
    } else {
      setPricePlans(items);
    }
  }, [isMobile, items, inView]);

  // in this case we align features and plans
  const isPlansAndFeaturesOnSameLine = pricing_features.length === pricePlans.length;

  return (
    <ThemeBlock theme={color_theme} paddingTop="0" paddingBottom="var(--spacing__md)">
      <Container pb={[0,, '1.5rem']} pt={['2rem',, '3.5rem']} position="relative" zIndex="2">
        <Plan
          height="100%"
          flexDirection="column"
          pb={[28, 34]}
          inView
          backgroundColor="white"
          borderColor="nightshadeFaded"
        >
          <Flex flexDirection="column" px={[24, 28]} pt="1.875rem" pb="1.875rem">
            <Flex alignItems="center" flexDirection="column" pb={3}>
              <Text
                whiteSpace="nowrap"
                color="lavender"
                typeStyle="h3"
                fontSize="36px !important"
                fontWeight="500 !important"
              >
                {pricing_title}
              </Text>
            </Flex>
            {!isMobile && <Divider />}
            <Wrapper
              isMobile={isMobile}
              canAlign={!isMobile && isPlansAndFeaturesOnSameLine}
              alignQuantity={pricing_features.length}
            >
              <PrismicRichText field={pricing_features} components={featuresSerializer} />
            </Wrapper>
          </Flex>
        </Plan>
        <Row pt={[4,, 0]} mt={[0,, 4]} ref={container}>
          {
            pricePlans.map((plan, planIndex) => (
              <Col span={[12, 12, 12, 12 / pricePlans.length]} key={plan.plan_title} mb={['2rem']} offset={[0, 0, 0, 0]}>
                <SmallPlan
                  selected={planIndex === 1}
                  plan={plan}
                  inView={inView}
                  animIndex={animIndicies[planIndex]}
                  stagger={pricePlans.length === 3}
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </ThemeBlock>
  );
}

SmallPlanSlice.propTypes = {
  primary: PropTypes.shape({
    pricing_title: PropTypes.string,
    pricing_features: RichTextType,
    new_background_color: PropTypes.string,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PricingPlanProps),
};

export default SmallPlanSlice;
