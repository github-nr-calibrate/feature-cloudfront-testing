import React from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import {
  Box, Container,
} from 'components/Layout';
import { LargeDiagram } from 'components/LargeDiagramSection';
import { useInView } from 'react-hook-inview';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';
import { ThemeBlock } from 'components/ThemeBlock';

function LargeDiagramSection({ primary }) {
  const {
    heading,
    subheading,
    diagram_outer_text_1,
    diagram_stat,
    diagram_stat_eyebrow,
    diagram_outer_text_2,
    color_theme,
  } = primary;

  const [container, inView] = useInView({ unobserveOnEnter: true });

  return (
    <ThemeBlock theme={color_theme} paddingTop="0" paddingBottom="0">
      <Box ref={container} position="relative" overflow="hidden">
        <Container pt={['5rem',, '7.5rem']} pb={['5rem',, '9rem']}>
          <Box>
            {(hasText(heading) || hasText(subheading)) && (
            <Box>
              <SectionHeader
                heading={heading}
                subheading={subheading}
                textAlign="center"
                maxWidth="48rem"
              />
            </Box>
          )}
          </Box>
          <Box>
            <LargeDiagram
              inView={inView}
              height={['calc((100vw - 46px) * 1.45)',, '36rem']}
              width="100%"
              mt="6rem"
              diagram_outer_text_1={diagram_outer_text_1}
              diagram_stat={diagram_stat}
              diagram_stat_eyebrow={diagram_stat_eyebrow}
              diagram_outer_text_2={diagram_outer_text_2}
            />
          </Box>
        </Container>
      </Box>
    </ThemeBlock>
  );
}

LargeDiagramSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    subheading: RichTextType,
    diagram_outer_text_1: RichTextType,
    diagram_stat: RichTextType,
    diagram_stat_eyebrow: RichTextType,
    diagram_outer_text_2: RichTextType,
    subhead_1: RichTextType,
    body_copy_1: RichTextType,
    subhead_2: RichTextType,
    body_copy_2: RichTextType,
    card_slider_header: RichTextType,
    color_theme: PropTypes.string,
  }),
};

export default LargeDiagramSection;
