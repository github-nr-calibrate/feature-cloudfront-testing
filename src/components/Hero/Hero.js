import React from 'react';
import styled from 'styled-components';
import PropTypes, { RichText as PrismicText, PrismicImage, PrismicDoc } from 'types';
import { RichText } from 'components/Text';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { useCta, useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import StyledButton from 'components/Button/StyledButton';
import { SectionHeader } from 'components/SectionHeader';
import { ThemeBlock } from 'components/ThemeBlock';
import { TextGrid } from 'components/TextGrid';
import { Container } from 'components/Layout';
import { isEmpty, hasText } from 'utils';
import { VariableMedia } from 'components/VariableMedia';
import { ImagesCarousel } from 'components/ImagesCarousel';
import { StarRating } from 'components/StarRating';
import { Animation } from 'components/Animation';

function Hero({ items, primary }) {
  const {
    heading,
    subheading,
    header_text_color,
    breadcrumbs,
    image,
    background_image,
    video_poster,
    body_copy,
    carousel_images,
    color_theme,
    show_rating,
    average_rating,
  } = primary || null;

  const cta = useCta(primary);
  const primaryImage = image || background_image || video_poster;
  const subHeadingText = subheading || body_copy;
  const hasPrimaryImage = primaryImage?.url;
  const isMobile = useMatchMedia(lessThan('sm'));

  const carouselImagesArray = (images) => {
    if (!images || isEmpty(images)) {
      return null;
    }

    // Get all the other images
    const imageArray = Object.keys(images).filter((key) => key !== 'alt'
      && key !== 'copyright'
      && key !== 'dimensions'
      && key !== 'url')
      .map((key) => images[key]);
    imageArray.unshift(images);

    // Format the array to be structured like 'items' in Prismic
    const formattedImages = [];
    imageArray.forEach((item, index) => {
      formattedImages[index] = {
        image: item,
      };
    });

    return formattedImages;
  };

  return (
    <ThemeBlock paddingTop="var(--spacing__sm)" paddingBottom={isEmpty(items) ? 'var(--spacing__xl)' : '0'} theme={color_theme}>
      <HeroContainer>
        {hasText(breadcrumbs) && (
          <Breadcrumbs>
            <RichText color={header_text_color}>
              {breadcrumbs}
            </RichText>
          </Breadcrumbs>
        )}
        <Header>
          <HeaderContainer $twoColumns={hasPrimaryImage}>
            {heading && (
              <SectionHeader
                heading={heading}
                subheading={subHeadingText}
                textAlign={!isMobile && hasPrimaryImage ? 'left' : 'center'}
                subheadingLarge
                typeStyle="h1"
              >
                {cta && (
                <StyledButton
                  data={cta}
                  mt="var(--spacing__sm)"
                  center={!hasPrimaryImage}
                />
                )}
                {(show_rating || average_rating) && (
                  <StarRating align={(hasPrimaryImage && !isMobile) ? 'left' : 'center'} />
                )}
              </SectionHeader>
            )}
            {primaryImage?.url
              && (
              <Animation name="revealLeft">
                <Media>
                  <VariableMedia src={primary} imgSrc={primaryImage} ratio={[0.81, 1.5, 1.5]} />
                </Media>
              </Animation>
              )}
          </HeaderContainer>
        </Header>

        {carousel_images?.url && (
          <ImagesCarousel items={carouselImagesArray(carousel_images)} primary={{ images_layout: 'staggered-images', color_theme }} />
        )}

        {!isEmpty(items) && (
          <TextGrid
            items={items}
          />
        )}
      </HeroContainer>
    </ThemeBlock>
  );
}

const HeroContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
    padding: 1.25rem 0;
    width: 100%;
    text-align: left;
    display: flex;
    align-items: center;
`;

const HeaderContainer = styled(Container)`
    display: grid;
    grid-template-columns: ${({ $twoColumns }) => ($twoColumns ? '1fr minmax(0, 1fr)' : '1fr')};
    align-items: center;
    gap: 3.125rem;
    margin: auto;

    ${MQBelow.sm`
      gap: 0.625rem;
      grid-template-columns: 1fr;
    `}
`;

const Media = styled.div`
    height: auto;
    width: 100%;
    max-width: 100%;

    ${MQAbove.sm`
        width: 100%;
        max-width: 27.5rem;
        margin: 0 0 0 auto;
    `}
`;

const Breadcrumbs = styled.div`
    text-align: center;
    margin: 0 auto 1.25rem auto;
    ${MQBelow.sm`
      margin: 0;
    `}

    p {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.8125rem;
      line-height: 2.5;
      a {
        text-decoration: none;
        margin: 0 5px;
        white-space: nowrap;

        &.isCurrentPage {
          background: var(--emphasis-color);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
        }
      }

      @media screen and (max-width: 23.125rem) {
        font-size: 0.7rem;
        a {
          margin: 0 3px;
        }
      }
    }
`;

Hero.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    subheading: PrismicText,
    image: PrismicImage,
    cta_text: PropTypes.string,
    cta_url: PrismicDoc,
    breadcrumbs: PrismicText,
    video_poster: PrismicImage,
    color_theme: PropTypes.string,
    show_rating: PropTypes.bool,
    average_rating: PropTypes.number,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PrismicImage,
    headline: PropTypes.string,
  })),
};

export default Hero;
