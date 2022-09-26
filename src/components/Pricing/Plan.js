import React from 'react';
import PropTypes, { RichText as RichTextType, PrismicLink } from 'types';
import styled from 'styled-components';
import { Box, Flex } from 'components/Layout';
import { Text, RichText } from 'components/Text';
import { Element } from '@prismicio/react';
import { toPriceString } from 'utils';
import { AffirmPrice as AffirmPriceComponent } from 'components/AffirmPrice';
import { MQAbove } from 'styles/mediaQueries';

const isDefined = (value) => value !== undefined && value !== null;

export const Plan = styled(Flex)``;

export const AffirmPrice = styled(Box)`
  color: ${({ theme }) => theme.colors.lavender};
  font-weight: 600 !important;
  font-size: 1rem;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.03rem;

  & .__affirm-logo {
    font-size: 22px !important;
    margin: 0 4px;
  }

  & .affirm-modal-trigger {
    display: none;
  }
`;

export const Price = styled(Flex).attrs({
  fontSize: 16,
  letterSpacing: '0.01em',
  fontWeight: 600,
  color: 'lavender',
  flexWrap: 'wrap',
})``;

const Description = styled(Text).attrs({
  typeStyle: 'p3',
})`
  margin-bottom: 0.75rem;
`;

export const FeaturesList = styled('ul')`
  padding-left: 1.5rem;
  position: relative;

  li {
    font-size: 0.875rem;
    line-height: 1.4rem;
    list-style: disc;
    margin-bottom: 0.25rem;
    padding-left: 0.25rem;

    ${MQAbove.md`
      font-size: 1rem;
      line-height: 1.6rem;
    `}
  }

  a {
    font-weight: 500;
    text-decoration: underline;
  }
`;

const PlanContent = styled.div`
  display: grid;
  width: 100%;
  padding: 2.5rem 0;
  border-bottom: var(--border__default);

  ${MQAbove.md`
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
  `}
`;

export function PricingPlan({
  plan, stagger,
}) {
  const {
    plan_title,
    plan_eyebrow,
    plan_description,
    plan_features,
    affirm_price,
    discount_affirm_price,
    base_price,
    discount_base_price,
    featured: featuredPlan,
  } = plan;
  const shared = { mb: [1, 0, 0] };

  const basic = {
    ...shared,
    backgroundColor: 'white',
    color: 'textDark',
    marginTop: 0,
    borderColor: 'nightshadeFaded',
  };

  const featured = {
    ...shared,
    backgroundColor: 'nightshade',
    color: 'textLight',
    marginTop: stagger ? [0, , '-2.5rem'] : [0, , undefined],
    borderColor: 'border',
  };

  const variant = featuredPlan ? featured : basic;

  const hasAffirm = isDefined(affirm_price);
  const hasAffirmDiscount = hasAffirm && isDefined(discount_affirm_price);
  const hasBaseDiscount = isDefined(discount_base_price);

  const affirmPriceNumber = hasAffirmDiscount ? discount_affirm_price : affirm_price;

  const affirmPriceString = hasAffirm ? toPriceString(Math.ceil(affirm_price / 12)) : null;
  const discountAffirmPriceString = hasAffirmDiscount
    ? toPriceString(Math.ceil(discount_affirm_price / 12))
    : null;

  const basePriceString = toPriceString(base_price);
  const discountBasePriceString = hasBaseDiscount
    ? toPriceString(discount_base_price)
    : null;

  return (
    <Plan
      {...variant}
    >
      <PlanContent>
        <Box pb={['1.25rem',, '0']}>
          <Box>
            <Text
              typeStyle="h4"
              marginBottom="0.5rem"
            >
              {plan_title}
            </Text>
            <Text
              typeStyle="bodyM"
              color="lavender"
              fontWeight="600 !important"
              letterSpacing="0.03rem !important"
              uppercase
            >
              {plan_eyebrow}
            </Text>
          </Box>
          {hasAffirm && (
            <AffirmPrice>
              <AffirmPriceComponent
                color={variant.affirmColor}
                amount={affirmPriceNumber}
                as="div"
              >
                <Price mt={3} style={{ whiteSpace: 'wrap' }}>
                  {discountAffirmPriceString || affirmPriceString}
                  <Flex
                    as="span"
                    flexDirection="column"
                    justifyContent="flex-end"
                    minHeight="100%"
                    fontSize="28px"
                    pb="6px"
                  >
                    /month
                  </Flex>
                </Price>
              </AffirmPriceComponent>
              <Text
                typeStyle="bodyM"
                color="lavender"
                fontWeight="600 !important"
                uppercase
              >
                or
                {' '}
                {discountBasePriceString || basePriceString}
                {' '}
                up front
              </Text>
            </AffirmPrice>
          )}
        </Box>
        <Box>
          {!!plan_description && (<Description mb={4}>{plan_description}</Description>)}
          <RichText typeStyle="bodyM">
            {plan_features}
          </RichText>
        </Box>
      </PlanContent>
    </Plan>
  );
}

export function featuresSerializer(type, element, content, children, key) {
  switch (type) {
    case Element.paragraph:
      return React.createElement(Text, { as: 'p', typeStyle: 'p5', key }, children);
    case Element.listItem:
      return React.createElement(Text, { as: 'li', fontSize: 15, key }, children);
    case Element.list:
      return React.createElement(FeaturesList, { key }, children);
    default:
      return null;
  }
}

export const PricingPlanProps = PropTypes.shape({
  plan_title: PropTypes.string,
  plan_eyebrow: RichTextType,
  affirm_price: PropTypes.number,
  discount_affirm_price: PropTypes.number,
  base_price: PropTypes.number,
  discount_base_price: PropTypes.number,
  plan_description: PropTypes.string,
  plan_features: RichTextType,
  plan_disclaimer: RichTextType,
  featured: PropTypes.bool,
  apply_now_label: PropTypes.string,
  apply_now_link: PrismicLink,
  banner: PropTypes.bool,
  banner_eyebrow: RichTextType,
  banner_strikethrough_price: PropTypes.number,
  banner_copy: RichTextType,
});

PricingPlan.propTypes = {
  plan: PricingPlanProps,
  stagger: PropTypes.bool,
  inView: PropTypes.bool,
  animIndex: PropTypes.number,
};
