import React from 'react';
import PropTypes, {
  RichText as PrismicText,
} from 'types';
import styled from 'styled-components';
import { Animation } from 'components/Animation';
import { MQAbove } from 'styles/mediaQueries';
import { RichText } from 'components/Text';
import { hasText } from 'utils';
import { VariableMedia } from 'components/VariableMedia';
import { Box } from 'components/Layout';

const MediaContainer = styled(Box)`
  padding: 1.5rem;

  ${MQAbove.md`
    padding: 2.5rem;
  `}
`;

const Caption = styled.div`
  max-width: 380px;
  margin: 20px auto 0 auto;
  
  p {
    font-weight: 500;
  }
`;

function VariableBox({
  item, flex,
}) {
  const {
    caption,
    text_emphasis_color,
    text_align,
  } = item;

  return (
    <MediaContainer flex={flex} textAlign={text_align}>
      <Animation name="fadeIn">
        <Box>
          <Box>
            <VariableMedia src={item} fluid />
          </Box>

          {hasText(caption) && (
            <Caption>
              <RichText typeStyle="bodyS" emphasisColor={text_emphasis_color}>{caption}</RichText>
            </Caption>
          )}
        </Box>
      </Animation>
    </MediaContainer>
  );
}

VariableBox.propTypes = {
  item: PropTypes.shape({
    caption: PrismicText,
    text_emphasis_color: PropTypes.string,
    text_align: PropTypes.string,
  }),
  flex: PropTypes.string,
};

export default VariableBox;
