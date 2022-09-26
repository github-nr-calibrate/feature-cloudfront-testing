import React from 'react';
import PropTypes, { PrismicLink, RichText as RichTextType } from 'types';
import { Box, Flex } from 'components/Layout';
import { Text, RichText } from 'components/Text';
import { Button } from 'components/Button';
import { slugify, toPriceString } from 'utils';
import { Divider } from 'components/Divider';
import styled from 'styled-components';
import { AffirmPrice } from 'components/AffirmPrice';
import { Plan } from './Plan';

const isDefined = (value) => value !== undefined && value !== null;

const PlanTitle = styled(Text)`
  font-size: 36px;
  font-weight: 500;
`;

const UpfrontCost = styled(Text)`
  font-weight: 500;

  s {
    color: var(--color__textMediumLight);
  }
`;

export function SmallPlan({
  plan, inView, animIndex, stagger, selected,
}) {
  const {
    plan_title,
    plan_features,
    plan_description,
    apply_now_label,
    apply_now_link,
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
  const hasBaseDiscount = isDefined(discount_base_price);
  const basePriceMonthly = hasAffirm ? toPriceString(Math.ceil(affirm_price / 12)) : null;
  const discountBasePriceString = hasBaseDiscount
    ? toPriceString(discount_base_price)
    : null;
  const hasAffirmDiscount = hasAffirm && isDefined(discount_affirm_price);
  const discountAffirmPriceString = hasAffirmDiscount
    ? toPriceString(Math.ceil(discount_affirm_price / 12))
    : null;

  return (
    <Plan
      height="100%"
      flexDirection="column"
      pb={[1, 34]}
      inView={inView}
      animIndex={animIndex}
      selected={selected}
      {...variant}
    >
      <Flex flexDirection="column" px={[24, 28]} pt={[28, 44]}>
        <Flex flexDirection="column" pb={3}>
          <PlanTitle
            whiteSpace="nowrap"
            color="lavender"
            typeStyle="h3"
          >
            {plan_title}
          </PlanTitle>
          {hasAffirm && (
            <>
              <AffirmPrice
                basePrice={basePriceMonthly}
                amount={discount_affirm_price}
                priceStyle="smallPlan"
              >
                <span className="affirm-ala-month">
                  {discountAffirmPriceString}
                  /month
                </span>
              </AffirmPrice>
              <UpfrontCost
                typeStyle="bodyS"
              >
                {'or '}
                <s>{toPriceString(base_price)}</s>
                {` ${discountBasePriceString} for 1 year upfront`}
              </UpfrontCost>
            </>
          )}
        </Flex>
        {!!plan_description && (
          <>
            <Divider />
            <Text
              style={{ display: 'flex', alignItems: 'center' }}
              minHeight={50}
              typeStyle="bodyM"
              fontWeight="500 !important"
              my={3}
            >
              {plan_description}
            </Text>
          </>
        )}
        <Divider />
        {apply_now_label
        && (
        <Box mt={3} mb={4}>
          <Button id={`joinNow_pricing_${slugify(plan_title)}`} width="100%" variant="primary" doc={apply_now_link}>
            {apply_now_label}
          </Button>
        </Box>
        )}
        <RichText>
          {plan_features}
        </RichText>
      </Flex>
    </Plan>
  );
}

export const PricingPlanProps = PropTypes.shape({
  plan_title: PropTypes.string,
  affirm_price: PropTypes.number,
  discount_affirm_price: PropTypes.number,
  base_price: PropTypes.number,
  discount_base_price: PropTypes.number,
  plan_description: PropTypes.string,
  plan_features: RichTextType,
  featured: PropTypes.bool,
  apply_now_label: PropTypes.string,
  apply_now_link: PrismicLink,
});

SmallPlan.propTypes = {
  plan: PricingPlanProps,
  stagger: PropTypes.bool,
  inView: PropTypes.bool,
  animIndex: PropTypes.number,
  selected: PropTypes.bool,
};
