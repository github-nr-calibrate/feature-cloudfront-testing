import React from 'react';
import PropTypes, {
  PrismicBoolean,
  PrismicImage,
  PrismicLink,
  RichText as PrismicText,
} from 'types';
import { RichText, TextFieldStyle } from 'components/Text';
import {
  Container, Box, Row, Col, Flex,
} from 'components/Layout';
import { parseDDColor } from 'client/prismic';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import styled from 'styled-components';

function ComparisonTable({ slice_type, primary, items }) {
  // Prismic data
  const {
    dark_mode,
    heading,
    strong_heading_color,
    sign_up_cta,
    subheading,
    new_background_color,
    no_bottom_padding,
    is_link_target,
  } = primary;

  const cta = useCta(primary);

  return (
    <Box
      bg={new_background_color ? parseDDColor(new_background_color) : 'grey'}
      pt={is_link_target ? ['5rem',, '5rem'] : ['2rem',, '5rem']}
      pb={no_bottom_padding ? [0,, 0] : ['2rem',, '3.5rem']}
      id={slice_type}
    >
      <Container>
        <Row pb={['1rem',, '2rem']}>
          <Col
            flex="auto"
            pb={['1rem',, '1rem']}
          >
            <Heading strongColor={strong_heading_color}>
              <RichText
                as="h2"
                typeStyle="h2"
              >
                {heading}
              </RichText>
              <RichText
                width="80%"
                as="p"
                px={['1rem',, '5rem']}
                color={dark_mode ? 'white' : 'inherit'}
                typeStyle="p"
              >
                {subheading}
              </RichText>
            </Heading>
          </Col>
        </Row>
        { items?.[0]?.table_box?.length > 0 && (
        <TableWrapper>
          <TableHeader>
            <Flex className="table header">
              <RichText>{items[0].table_box}</RichText>
            </Flex>
          </TableHeader>
          <TableCells>
            <Flex className="table cell left">
              <RichText>{items[1].table_box}</RichText>
            </Flex>
            <Flex className="table cell right">
              <RichText>{items[2].table_box}</RichText>
            </Flex>
          </TableCells>
        </TableWrapper>
)}
        { sign_up_cta && cta
          && (
          <Row>
            <Col>
              <Flex width="100%" justifyContent="center">
                <StyledButton
                  data={cta}
                />
              </Flex>
            </Col>
          </Row>
          )}
      </Container>
    </Box>
  );
}

const Heading = styled(TextFieldStyle)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p { text-align: center; }
    p + p { margin-top: 1rem; }
    strong { color: ${({ strongColor }) => strongColor ? parseDDColor(strongColor) : 'black'}; }

    @media screen and (min-width: 52em) {
    p + p { margin-top: 0.3rem; }
    }
`;

const TableWrapper = styled(Flex)`
  flex-direction: column;
  margin: 0 auto 2em auto;
  width: 100%;
  .table {
    padding: 1.5rem 0 1.5rem 0.8rem;
    display: flex;
  }
  @media screen and (min-width: 52em) {
    width: 85%;
    .table {
      padding: 2rem 1.5rem;
    }
  }
`;

const TableHeader = styled(Flex)`
  border: solid black;
  border-width: 1px 1px 0 1px;
  em {
    color: #148e86;
  }
  em::after {
    content: " ";
    display: block;
  }
  @media screen and (min-width: 52em) {
    strong {
      display: inline;
    }
    em::after {
      content: "";
      display: inline;
    }
  }
`;

const TableCells = styled(Flex)`
  flex-direction: column;
  @media screen and (min-width: 52em) {
    flex-direction: row;
  }
  .table.left {
    border: 1px solid black;
  }
  .table.right {
    border: solid black;
    border-width: 0 1px 1px 1px;
  }
  @media screen and (min-width: 52em) {
    .table.right {
      border: solid black;
      border-width: 1px 1px 1px 0;
    }
    .cell {
      width: 50%;
    }
  }
  .block-img {
    float: left;
    margin: 0 0.5em 0 0;
  }
  .table.cell p {
    margin-top: 0;
  }
  .table.cell p:not(.block-img) {
    min-height: 5em;
    width: 95%;
  }
  .table.cell p:first-child {
    margin-bottom: 1em;
    min-height: auto;
    width: 100%;
  }
  em {
    display: block;
    font-size: 0.8em;
    margin-top: 1em;
  }
  @media screen and (min-width: 52em) {
    em {
      margin-top: 0;
    }
  }
`;

ComparisonTable.propTypes = {
  slice_type: PropTypes.string,
  primary: PropTypes.shape({
    is_link_target: PropTypes.bool,
    body_copy: PrismicText,
    button_label: PrismicText,
    button_link: PrismicLink,
    dark_mode: PropTypes.bool,
    heading: PrismicText,
    strong_heading_color: PropTypes.string,
    sign_up_cta: PrismicBoolean,
    cta_copy: PrismicText,
    new_background_color: PropTypes.string,
    no_bottom_padding: PropTypes.bool,
    subheading: PropTypes.arrayOf(PropTypes.shape({
      spans: PropTypes.array,
      text: PropTypes.string,
      type: PropTypes.string,
    })),
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    heading: PrismicText,
    body_copy: PrismicText,
    table_box: PropTypes.array,
  })),
};

export default ComparisonTable;
