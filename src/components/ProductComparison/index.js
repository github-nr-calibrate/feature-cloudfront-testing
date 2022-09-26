import React from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { RichText, TextFieldStyle, TextField } from 'components/Text';
import { Container, Box } from 'components/Layout';

const ProductComparison = ({ primary, items }) => (
  <ProductComparisonTable>
    <Container>
      <Box as="header">
        <TextField>{primary.header}</TextField>
      </Box>

      <table cellSpacing={0}>
        <tr>
          <th />
          <th>
            <TextFieldStyle>
              <RichText>{primary.product_one}</RichText>
            </TextFieldStyle>
          </th>
          <th>
            <TextFieldStyle>
              <RichText>{primary.product_two}</RichText>
            </TextFieldStyle>
          </th>
        </tr>
        {items.map((item) => (
          <tr>
            <td>
              <TextFieldStyle>
                <RichText>{item.row_label}</RichText>
              </TextFieldStyle>
            </td>
            <td>
              <Mark
                isYes={item.column_one_cell_value === 'YES'}
              >
                {item.column_one_cell_value === 'YES' ? '\u2713' : '\u2717' }
              </Mark>
            </td>
            <td>
              <Mark
                isYes={item.column_two_cell_value === 'YES'}
              >
                {item.column_two_cell_value === 'YES' ? '\u2713' : '\u2717' }
              </Mark>
            </td>
          </tr>
          ))}
      </table>
    </Container>
  </ProductComparisonTable>
  );

const ProductComparisonTable = styled.section`
  background: var(--color__textDark);
  color: #fff;
  padding: 3rem 0;

  ${MQAbove.sm`
     padding: 5rem 0;
  `}
  
  header {
    text-align: center;
    margin: 0 auto;
    padding: 0 1rem 1rem 1rem;
  }

  table {
    width: 100%;

    th, td {
      padding: 1.2rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
      font-size: 1rem;
      text-align: center;

      ${MQAbove.sm`
        font-size: 1.2em;
      `}
    }

    tr td:first-child {
      text-align: left;
    }

    th {
      vertical-align: bottom;
      padding: 1.2rem .2rem;
    }
  }
`;

const Mark = styled.span`
  font-size: 1.6rem;
  color: ${({ isYes }) => (isYes ? 'var(--color__lavenderLight)' : 'rgba(255, 255, 255, .5)')};
`;

ProductComparison.propTypes = {
  primary: PropTypes.shape({
    header: PropTypes.string,
    product_one: RichTextType,
    product_two: RichTextType,
  }),
  items: PropTypes.any,
};

export default ProductComparison;
