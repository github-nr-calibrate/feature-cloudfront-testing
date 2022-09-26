import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { useAffirm } from 'utils/hooks';
import { Box } from 'components/Layout';
import PropTypes from 'types';
import styled from 'styled-components';

const AffirmPriceBox = styled(Box)`
  font-size: 1rem;
  max-width: 100%;

  &.largeText {
    font-size: 1.125rem;
  }

  &.smallPlan {
    font-size: 0.875rem;
    line-height: 1.1;
    padding-bottom: 0.3125rem;

    & .affirm-ala-month {
      color: var(--color__lavender);
      font-weight: 500;
      font-size: 28px;
      padding-right: 100%;
      line-height: 1;
      word-break: break-word;
    }

    & .affirm-ala-price {
      font-size: 28px;
      letter-spacing: 0.01em;
    }

    & .affirm-modal-trigger {
      display: inline-block;
      padding-top: 6px;
    }

    & .__affirm-logo {
      font-size: 18px !important;
    }
  }
`;

const BasePrice = styled.s`
  margin-top: 0.625rem;
  margin-bottom: 0.3125rem;
  color: var(--color__lavenderLight);
`;

function AffirmPrice({
  amount, pt, pb, color = 'black', as = 'p', basePrice, priceStyle, children,
}) {
  const [loaded, setLoaded] = useState(false);
  useAffirm(loaded);

  const handleVisibility = isVisible => {
    // Set the loaded state to true the first time in the viewport
    if (isVisible && !loaded) {
      setLoaded(true);
    }
    // Refresh pricing data to ensure the latest data is shown
    if (isVisible && loaded) {
      window.affirm.ui.ready(window.affirm.ui.refresh);
    }
  };

  return (
    <VisibilitySensor
      onChange={isVisible => handleVisibility(isVisible)}
      offset={{ top: 0 }}
      partialVisibility
    >
      <>
        {basePrice && (
        <BasePrice>
          {basePrice}
          /month
        </BasePrice>
        )}
        <AffirmPriceBox
          as={as}
          pt={pt}
          pb={pb}
          className={`affirm-as-low-as ${priceStyle}`}
          data-page-type="product"
          data-affirm-color={color}
          data-amount={amount}
        >
          {children || 'Loading price...'}
        </AffirmPriceBox>
      </>
    </VisibilitySensor>
  );
}

AffirmPrice.propTypes = {
  as: PropTypes.string,
  pt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  pb: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  color: PropTypes.string,
  amount: PropTypes.number,
  basePrice: PropTypes.string,
  priceStyle: PropTypes.string,
  children: PropTypes.node,
};

export default AffirmPrice;
