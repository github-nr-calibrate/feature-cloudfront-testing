import React from 'react';
import PropTypes, { RichText as PrismicText } from 'types';
import { RichText } from 'components/Text';
import { Box } from 'components/Layout';
import styled from 'styled-components';

function ItemsCopyWithList({ items, paddingTop, color }) {
  const hasItems = (items) => !!(items?.[0]?.item_body_copy?.length);

  return (
    hasItems(items) && (
      <List
        as="ul"
        pt={[0, paddingTop, paddingTop]}
        strongColor={color}
      >
        {
          items.map(({
            item_body_copy,
          }, index) => (
            <Box
              as="li"
              pb={4}
              pl={3}
              key={`list_item_${index}`}
            >
              <RichText
                textAlign="left"
                typeStyle="bodyM"
              >
                {item_body_copy}
              </RichText>
            </Box>
          ))
        }
      </List>
    )
  );
}

const List = styled(Box)`
  strong {
    color: ${({ strongColor }) => strongColor};
  }
  li {
    display: flex;
    align-items: center;

    &::before {
      content: '✔';
      display: inline-block;
      margin-right: 0.625rem;
    }
  }
`;

ItemsCopyWithList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    item_body_copy: PrismicText,
  })),
  paddingTop: PropTypes.string,
  color: PropTypes.string,
};

export default ItemsCopyWithList;
