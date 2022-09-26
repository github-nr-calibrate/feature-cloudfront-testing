import React from 'react';
import PropTypes, {
  PrismicBoolean,
  PrismicImage,
  PrismicLink,
  RichText as PrismicText,
} from 'types';
import { RichText } from 'components/Text';
import {
  Container, Box, Row, Col, Flex,
} from 'components/Layout';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { ThemeBlock } from 'components/ThemeBlock';
import { Animation } from 'components/Animation';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';

// TODO This is old code component, which looks bad and requires rewriting and redesign

function FocusedComparisonTable({ slice_type, primary, items }) {
  // Prismic data
  const {
    heading,
    sign_up_cta,
    cta_copy,
    subheading,
    no_bottom_padding,
    is_link_target,
    color_theme = 'light',
  } = primary;

  const cta = useCta(primary);

  /**
   * Func for manual RichText rows with img parsing, cause RichText by it own do it bad
   */
  const rowParser = (arr) => {
    const result = [];
    for (let i = 0; i < arr?.length; i += 1) {
      if (arr[i]?.url) {
        result.push({
          image: [arr[i]],
          string: [arr[i + 1]],
        });
        i += 1;
      } else { result.push([arr[i]]); }
    }

    return result.map(el => Array.isArray(el)
      ? (<RichText>{el}</RichText>)
      : (
        <Flex alignItems="center">
          <RichText mr=".5rem">{el.image}</RichText>
          <RichText>{el.string}</RichText>
        </Flex>
      ));
  };

  return (
    <ThemeBlock
      theme={color_theme}
      paddingTop={is_link_target ? ['5rem',, '5rem'] : ['2rem',, '5rem']}
      paddingBottom={no_bottom_padding ? [0,, 0] : ['2rem',, '3.5rem']}
      id={slice_type}
    >
      <Container>
        <Row>
          <Col
            flex="auto"
            pb={['4rem',, '6.5rem']}
          >
            {(hasText(heading) || hasText(subheading)) && (
              <Animation name="fadeIn">
                <Box>
                  <SectionHeader
                    heading={heading}
                    subheading={subheading}
                    marginBottom="0"
                  >
                    {cta && (
                      <StyledButton
                        data={cta}
                        mt="1.875rem"
                        center
                      />
                    )}
                  </SectionHeader>
                </Box>
              </Animation>
            )}
          </Col>
        </Row>
        { items?.[0]?.table_box?.length > 0 && (
          <TableWrapper>
            <TableHeader>
              <Flex className="table header">
                <RichText>{items[0]?.table_box}</RichText>
              </Flex>
            </TableHeader>
            <TableCells>
              <Box className="table cell left">
                {rowParser(items[1]?.table_box)}
              </Box>
              <Box className="table cell right">
                {rowParser(items[2]?.table_box)}
              </Box>
            </TableCells>
          </TableWrapper>
        )}
        { sign_up_cta && cta_copy
          && (
          <Row pt={['0.5rem',, '1.5rem']}>
            <Col>
              <Flex width="100%" justifyContent="center">
                <StyledButton
                  data={cta}
                  center
                />
              </Flex>
            </Col>
          </Row>
          )}
      </Container>
    </ThemeBlock>
  );
}

const TableWrapper = styled(Flex)`
  flex-direction: column;
  margin: 0 auto 2em auto;
  width: 100%;

  ${MQAbove.md`
    width: 85%;
  `}

  .table {
    padding: 1.5rem 0.8rem;

    ${MQAbove.md`
      padding: 2rem 1.5rem;
    `}
  }
`;

const TableHeader = styled(Flex)`
  border: solid var(--border-color);
  border-width: 1px 1px 0 1px;

  em {
    color: #148e86;
  }

  em::after {
    content: " ";
    display: block;
  }

  ${MQAbove.md`
    strong {
      display: inline;
    }
    em::after {
      content: "";
      display: inline;
    }
  `}
`;

const TableCells = styled(Flex)`
  flex-direction: column;

  ${MQAbove.md`
    flex-direction: row;

    .cell {
      width: 50%;
    }
  `}

  p {
    line-height: 1.35rem;
  }

  a {
    font-weight: 500;
  }

  .table.left {
    border: 1px solid var(--border-color);
  }

  .table.right {
    border: solid var(--border-color);
    border-width: 0 1px 1px 1px;

    ${MQAbove.md`
      border: solid var(--border-color);
      border-width: 1px 1px 1px 0;
    `}
  }

  .table.cell p:first-child:not(.block-img) {
    margin-bottom: 1em;
    min-height: auto;
    width: 100%;
  }

  .block-img {
    width: 40px;
    margin-bottom: 1rem;
    margin-right: 0.25rem;
  }

  em {
    display: block;
    font-size: 0.8em;
    margin-top: 1em;

    ${MQAbove.md`
      margin-top: 0;
    `}
  }
`;

FocusedComparisonTable.propTypes = {
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
    color_theme: PropTypes.string,
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

export default FocusedComparisonTable;
