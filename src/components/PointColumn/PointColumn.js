import React from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicLink,
  PrismicImage,
} from 'types';
import { Text, RichText } from 'components/Text';
import styled from 'styled-components';
import { Animation } from 'components/Animation';
import { Flex } from 'components/Layout';
import ResponsiveImage from 'components/ResponsiveImage';
import { ArrowButton } from 'components/ArrowButton';

const SectionContainer = styled.div`
  padding: 2.5rem 2.5rem 3rem 2.5rem;
  position: relative;

  a {
    text-decoration: underline;
    transition: color 0.3s ease-out;
    font-weight: 500;

    &:hover {
      color: var(--color__lavender);
    }
  }
`;

const IconBox = styled.div`
  // margin: 0 auto 0.5rem auto;
  margin-bottom: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
`;

const Heading = styled(Text)`
  font-weight: 500;
  white-space:pre-wrap;
`;

const SectionSubheading = styled(RichText)`
  font-weight: 400;
  margin-top: 0.5rem;
`;

function Section({
  item, index, alignItems = 'center',
}) {
  const {
    icon,
    icon_image,
    card_icon_image,
    heading,
    card_heading,
    subheading,
    body_copy,
    card_text,
    cta_label,
    cta_link,
    link,
  } = item;

  const iconBoxImage = icon || icon_image || card_icon_image;
  const iconBoxHeading = heading || card_heading;
  const iconBoxSubheading = subheading || body_copy || card_text;
  const iconLink = cta_link || link;

  return (
    <SectionContainer key={`Column-${index}`}>
      <Animation name="fadeIn">
        <Flex
          textAlign={['center', , , alignItems]}
          alignItems={['center', , , alignItems === 'left' ? 'flex-start' : 'center']}
          flexDirection="column"
        >
          {iconBoxImage?.url && (
            <IconBox>
              <ResponsiveImage src={iconBoxImage} svgAsImage />
            </IconBox>
          )}
          {iconBoxHeading && (
          <Heading typeStyle={iconBoxSubheading ? 'h5' : 'h4'}>
            { iconBoxHeading }
          </Heading>
          )}
          {iconBoxSubheading && (
          <SectionSubheading typeStyle="bodyM">
            { iconBoxSubheading }
          </SectionSubheading>
          )}
          {iconLink && iconLink.link_type !== 'Any' && (
            <ArrowButton
              doc={iconLink}
              mt="0.75rem"
              cta_label={cta_label}
            />
          )}
        </Flex>
      </Animation>
    </SectionContainer>
  );
}

Section.propTypes = {
  item: PropTypes.shape({
    icon: PrismicImage,
    icon_image: PrismicImage,
    card_icon_image: PrismicImage,
    heading: PrismicText,
    card_heading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    subheading: PrismicText,
    body_copy: PrismicText,
    card_text: PrismicText,
    cta_label: PrismicText,
    cta_link: PrismicLink,
    link: PrismicLink,
  }),
  index: PropTypes.number,
  alignItems: PropTypes.string,
};

export default Section;
