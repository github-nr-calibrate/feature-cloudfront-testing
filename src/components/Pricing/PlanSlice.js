import React, { useState, useEffect } from 'react';
import PropTypes, { PrismicLink, RichText as RichTextType } from 'types';
import {
  Container, Box,
} from 'components/Layout';
import styled from 'styled-components';
import { RichText } from 'components/Text';
import { hasText } from 'utils';
import { useMatchMedia, useCta } from 'utils/hooks';
import { SectionHeader } from 'components/SectionHeader';
import StyledButton from 'components/Button/StyledButton';
import { lessThan } from 'styles/media';
import { useInView } from 'react-hook-inview';
import { PricingPlan, PricingPlanProps } from './Plan';

const sortByFeatured = ({ featured }) => (featured ? -1 : 1);

function PlanSlice({ primary, items }) {
  const {
    heading,
    subheading,
    disclaimer,
  } = primary;

  const cta = useCta(primary);

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

  return (
    <Box as="section" pb={['3rem',, '4.5rem']} pt={['4.5rem',, '6.5rem']}>
      <Container position="relative" zIndex="2">
        {hasText(heading) && (
          <Box marginBottom={['3rem',, '5rem']}>
            <SectionHeader
              heading={heading}
              subheading={subheading}
              marginBottom="0"
              maxWidth="50rem"
            >
              {cta && (
                <StyledButton
                  data={cta}
                  mt="2rem"
                  center
                />
              )}
            </SectionHeader>
          </Box>
        )}
        <Box ref={container} borderTop="1px solid #C8C5D2">
          {pricePlans.map((plan, planIndex) => (
            <PricingPlan
              plan={plan}
              inView={inView}
              animIndex={animIndicies[planIndex]}
              stagger={pricePlans.length === 3}
              key={`plan-${planIndex}`}
            />
          ))}
        </Box>
        <Box width={['100%',, '50%']} pt={['2.5rem',, '3.5rem']}>
          <Disclaimer typeStyle="bodyS" color="slate">
            {disclaimer}
          </Disclaimer>
        </Box>
      </Container>
    </Box>
  );
}

const Disclaimer = styled(RichText)`
  font-size: 0.75rem;

  a {
    font-weight: 600;
  }
`;

PlanSlice.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    subheading: RichTextType,
    cta_label: PropTypes.string,
    cta_url: PrismicLink,
    disclaimer: RichTextType,
  }),
  items: PropTypes.arrayOf(PricingPlanProps),
};

export default PlanSlice;
