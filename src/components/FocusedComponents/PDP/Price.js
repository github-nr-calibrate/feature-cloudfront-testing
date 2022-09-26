import React from 'react';
import PropTypes, { RichText as PrismicText } from 'types';
import { Flex } from 'components/Layout';
import { RichText } from 'components/Text';

const Price = ({ primary }) => {
  const {
    price_body_copy,
    copy_width = '60%',
    price,
    payment_period,
  } = primary;
  const hasPriceBodyCopy = !!price_body_copy?.length && !!price_body_copy[0].text.length;

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems={['left',, 'left']}
      textAlign={['left',, 'left']}
      pb={[4, '2.5rem', 5]}
    >
      <Flex
        pb={3}
        alignItems="baseline"
      >
        <RichText
          typeStyle="PDPPrice"
          lineHeight="none"
        >
          {price}
        </RichText>
        <RichText
          typeStyle="PDPPeriod"
          lineHeight="none"
        >
          {payment_period}
        </RichText>
      </Flex>
      {hasPriceBodyCopy && (
        <RichText
          typeStyle="bodyM"
          lineHeight="none"
          width={['100%', copy_width]}
        >
          {price_body_copy}
        </RichText>
      )}
    </Flex>
  );
};

Price.propTypes = {
  primary: PropTypes.shape({
    price_body_copy: PrismicText,
    copy_width: PropTypes.string,
    price: PropTypes.string,
    payment_period: PropTypes.string,
  }),
};

export default Price;
