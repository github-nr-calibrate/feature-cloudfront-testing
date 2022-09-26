import React from 'react';
import PropTypes, { RichText as PrismicText } from 'types';
import {
  Flex, Container, Col, Row,
} from 'components/Layout';
import { RichText } from 'components/Text';
import Diagram from './Diagram';

function DiagramSection({ primary }) {
  // Primsic data
  const {
    heading,
    body_copy,
    diagram_side,
    diagram_text_top_left,
    diagram_text_top_right,
    diagram_text_bottom_left,
    diagram_text_bottom_right,
  } = primary;

  const diagramLeft = !diagram_side;

  return (
    <Flex bg="white" flexDirection="column">
      <Container>
        <Row py="5rem">
          <Col
            span={[12,,, 5]}
            offset={[0,,, diagramLeft ? 1 : 0]}
            order={[0,,, diagramLeft ? 1 : 0]}
          >
            <Flex
              flexDirection="column"
              height={['auto',,, '100%']}
              justifyContent="center"
              mb={['2.75rem',, '3.5rem', '0']}
            >
              {heading.length > 0 && (
                <RichText typeStyle="subhead" pb="4">{heading}</RichText>
              )}
              {body_copy.length > 0 && (
                <RichText typeStyle="bodyM">{body_copy}</RichText>
              )}
            </Flex>
          </Col>
          <Col
            span={[12,,, 6]}
            order={[0,,, diagramLeft ? 0 : 1]}
            offset={[0,,, diagramLeft ? 0 : 1]}
          >
            <Diagram text={[
              diagram_text_top_left,
              diagram_text_top_right,
              diagram_text_bottom_left,
              diagram_text_bottom_right,
            ]}
            />
          </Col>
        </Row>
      </Container>
    </Flex>
  );
}

DiagramSection.propTypes = {
  primary: PropTypes.shape({
    diagram_side: PropTypes.bool,
    heading: PrismicText,
    body_copy: PrismicText,
    diagram_text_top_left: PrismicText,
    diagram_text_top_right: PrismicText,
    diagram_text_bottom_left: PrismicText,
    diagram_text_bottom_right: PrismicText,
  }),
};

export default DiagramSection;
