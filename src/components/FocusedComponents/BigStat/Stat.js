import React from 'react';
import PropTypes, { PrismicImage, RichText as PrismicText } from 'types';
import { Flex } from 'components/Layout';
import { RichText } from 'components/Text';
import { alignNormalization } from 'components/FocusedComponents/ParentBlock';
import { parseDDColor } from 'client/prismic';

const Stat = ({ primary }) => {
  const {
    stat_body_copy,
    copy_width,
    stat_value,
    align_text,
    is_stat_on_side,
    stat_color,
  } = primary;
  const hasStatBodyCopy = !!stat_body_copy?.length && !!stat_body_copy[0].text.length;

  return hasStatBodyCopy && (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems={['center',, alignNormalization[align_text]]}
      textAlign={['center',, align_text === 'center' ? align_text : 'left']}
    >
      <RichText
        typeStyle={is_stat_on_side ? 'bigStatP1' : 'statP1'}
        lineHeight="none"
        width={['100%', copy_width]}
        color={parseDDColor(stat_color)}
      >
        {stat_value}
      </RichText>
      {hasStatBodyCopy && (
        <RichText
          typeStyle="p1"
          lineHeight="none"
          width={['100%', copy_width]}
          pb={4}
        >
          {stat_body_copy}
        </RichText>
      )}
    </Flex>
  );
};

Stat.propTypes = {
  primary: PropTypes.shape({
    stat_body_copy: PrismicText,
    copy_width: PropTypes.string,
    stat_value: PropTypes.string,
    align_text: PropTypes.string,
    is_image: PropTypes.bool,
    image: PrismicImage,
    background_color: PropTypes.string,
    is_stat_on_side: PropTypes.bool,
    stat_color: PropTypes.string,
  }),
};

export default Stat;
