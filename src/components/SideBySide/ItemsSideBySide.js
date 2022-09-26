import React from 'react';
import PropTypes, { PrismicImage, RichText as PrismicText } from 'types';
import { Box, Flex } from 'components/Layout';
import { RichText } from 'components/Text';
import { parseDDColor } from 'client/prismic';
import ResponsiveImage from 'components/ResponsiveImage';

const ItemsSideBySide = ({ items, paddingTop, textColor }) => (
  items.length && (
    <Flex
      pt={[0, paddingTop, paddingTop]}
      pb="2rem"
      flexDirection="column"
      width={['100%', '50%']}
      color={textColor && parseDDColor(textColor)}
      gridGap={['30px', , '60px']}
    >
      { items.map(({
        icon_image,
        item_heading,
        item_body_copy,
      }, index) => (
        <Flex
          key={`list_item_${item_heading}_${index}`}
          width="100%"
        >
          {icon_image.url
              && (
                <Box
                  mr="2rem"
                  width="5rem"
                  height="5rem"
                  flex="0 0 auto"
                >
                  <ResponsiveImage
                    src={icon_image}
                  />
                </Box>
              )}
          <Flex
            flexDirection="column"
            justifyContent="center"
          >
            {!!item_heading.length && (
            <RichText
              typeStyle="h5"
              mb={item_body_copy.length ? '0.625rem' : 0}
            >
              {item_heading}
            </RichText>
            )}
            <RichText
              typeStyle="bodyM"
            >
              {item_body_copy}
            </RichText>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ));

ItemsSideBySide.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_heading: PrismicText,
    item_body_copy: PrismicText,
  })),
  paddingTop: PropTypes.string,
  textColor: PropTypes.string,
};

export default ItemsSideBySide;
