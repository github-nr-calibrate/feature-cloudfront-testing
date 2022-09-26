import React from 'react';
import PropTypes, { PrismicImage, RichText as PrismicText } from 'types';
import { ParentBlock } from 'components/FocusedComponents';
import { Box, Flex } from 'components/Layout';
import { parseDDColor } from 'client/prismic';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import Stat from './Stat';

const BigStat = ({ primary }) => {
  const {
    is_side_by_side,
    side_image,
    is_parent_on_right,
    background_color,
    is_stat_on_side,
    side_stat_color,
    side_stat_background,
  } = primary;

  const isMobile = useMatchMedia(lessThan('lg'));
  const imgSource = isMobile ? side_image?.mobile?.url : side_image?.url;

  return is_side_by_side ? (
    <Flex
      flexDirection={['column', is_parent_on_right ? 'row-reverse' : 'row']}
      bg={parseDDColor(background_color)}
    >
      <Box
        width={['100%', '50%']}
        pb={[0,, '1rem']}
      >
        <ParentBlock
          Component={is_stat_on_side ? false : <Stat primary={primary} />}
          primary={primary}
          mobileAlign="center"
        />
      </Box>
      {is_stat_on_side
        ? (
          <Flex
            px={['1.5rem',, '5rem']}
            color={parseDDColor(side_stat_color)}
            bg={parseDDColor(side_stat_background)}
            alignItems="center"
            width={['100%', '50%']}
          >
            <Stat primary={primary} />
          </Flex>
        )
        : (
          <Box
            as="img"
            width={['100%', '50%']}
            src={imgSource}
            aria-hidden
            style={
              {
                objectFit: 'cover',
                objectPosition: 'center',
              }
            }
          />
        )}
    </Flex>
  ) : (
    <ParentBlock Component={<Stat primary={primary} />} primary={primary} mobileAlign="center" />
  );
};

BigStat.propTypes = {
  primary: PropTypes.shape({
    stat_body_copy: PrismicText,
    copy_width: PropTypes.string,
    stat_value: PropTypes.string,
    align_text: PropTypes.string,
    is_side_by_side: PropTypes.bool,
    side_image: PrismicImage,
    background_color: PropTypes.string,
    is_parent_on_right: PropTypes.bool,
    is_stat_on_side: PropTypes.bool,
    side_stat_color: PropTypes.string,
    side_stat_background: PropTypes.string,
  }),
};

export default BigStat;
