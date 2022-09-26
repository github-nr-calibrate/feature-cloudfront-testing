import React from 'react';
import PropTypes, { PrismicImage, PrismicLink, RichText as PrismicText } from 'types';
import { Box, Flex } from 'components/Layout';
import { RichText } from 'components/Text';
import { Link } from 'components/Link';
import { parseDDColor } from 'client/prismic';
import { useOneHeight } from 'utils/hooks';

function ItemsValueProps({ items }) {
  const hasItems = (items) => !!(items?.[0]?.item_body_copy?.length
    || items?.[0]?.item_heading?.length
    || Object.keys(items?.[0]?.icon_image || {})?.length
    || Object.keys(items?.[0]?.item_link || {})?.length && items?.[0].item_link_label?.length);

  const { height: headingHeight, refs: headingRefs } = useOneHeight(items);
  const { height: bodyHeight, refs: bodyRefs } = useOneHeight(items);

  if (!hasItems(items)) {
    return null;
  }

  const itemWidth = `${100 / items.length}%`;

  return (
    hasItems(items) && (
    <Flex
      pt={4}
      minWidth="90%"
      px={[0,, '4.5rem']}
      m={['-1rem', '-2rem']}
      flexDirection={['column', 'row', 'row']}
      justifyContent="space-between"
      alignItems="center"
    >
      { items.map(({
        icon_image,
        item_heading,
        heading_text_color,
        item_body_copy,
        item_link,
        item_link_label,
      }, index) => (
        <Box
          key={`list_item_${item_heading}_${index}`}
          maxWidth="19rem"
          m={['1rem', '2rem']}
          width={['none', itemWidth, itemWidth]}
        >
          <Flex
            alignItems="center"
            flexDirection="column"
          >
            {icon_image?.url
                && (
                  <Box
                    as="img"
                    height="5em"
                    width="5em"
                    mb="2.5rem"
                    src={icon_image.url}
                    aria-hidden
                  />
                )}
            <Box ref={headingRefs[index]} height={['none', `${headingHeight}px`, `${headingHeight}px`]}>
              <RichText
                px={['3rem', 0]}
                typeStyle="bodyM"
                fontWeight="500 !important"
                pb={[0,, 3]}
                textAlign="center"
                color={parseDDColor(heading_text_color)}
              >
                {item_heading}
              </RichText>
            </Box>
            <Box ref={bodyRefs[index]} height={['none', `${bodyHeight}px`, `${bodyHeight}px`]}>
              <RichText
                height="100%"
                textAlign="center"
                typeStyle="bodyS"
              >
                {item_body_copy}
              </RichText>
            </Box>
            { item_link?.link_type !== 'Any'
                && (
                  <Link
                    pt={[3, 4]}
                    doc={item_link}
                    style={{
                      textDecoration: 'underline',
                    }}
                  >
                    <RichText>{item_link_label}</RichText>
                  </Link>
                )}
          </Flex>
        </Box>
      ))}
    </Flex>
    )
  );
}

ItemsValueProps.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_heading: PrismicText,
    heading_text_color: PropTypes.string,
    item_body_copy: PrismicText,
    item_link: PrismicLink,
    item_link_label: PrismicText,
  })),
};

export default ItemsValueProps;
