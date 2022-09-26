import React, { useState } from 'react';
import { Container, Box } from 'components/Layout';
import styled from 'styled-components';
import { Text } from 'components/Text';
import { useReviewsIOCarousel, useCta } from 'utils/hooks';
import PropTypes, { PrismicDoc, RichText as PrismicText } from 'types';
import StyledButton from 'components/Button/StyledButton';
import VisibilitySensor from 'react-visibility-sensor';
import { ThemeBlock } from 'components/ThemeBlock';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';
import { StarRating } from 'components/StarRating';

function ReviewsCarousel({ primary }) {
  useReviewsIOCarousel();
  const cta = useCta(primary);
  const [visibility, setVisibility] = useState(false);
  useReviewsIOCarousel(visibility);

  return (
    <VisibilitySensor
      onChange={isVisible => !visibility && isVisible && setVisibility(true)}
      offset={{ top: 0 }}
      partialVisibility
    >
      <ThemeBlock theme="dark">
        <Container textAlign="center">
          <Animation name="fadeIn">
            <HeadingText typeStyle="h2">
              Member
              {' '}
              <strong>Reviews</strong>
            </HeadingText>
            <StarRating pb="var(--spacing__md)" />
          </Animation>
        </Container>
        <Animation name="fadeIn">
          <CarouselBox id="reviewsio-carousel-widget" />
        </Animation>
        <Container textAlign="center">
          {cta && (
            <Animation name="fadeIn">
              <Box>
                <StyledButton
                  data={cta}
                />
              </Box>
            </Animation>
          )}
        </Container>
      </ThemeBlock>
    </VisibilitySensor>
  );
}

 const HeadingText = styled(Text)`
    strong {
      color: var(--emphasis-color);
    }
  `;

  const CarouselBox = styled(Box)`
    .CarouselWidget-prefix .CarouselWidget {
      margin-bottom: 6.5rem;
      --scroll-button-icon-size: 24px;

      ${MQAbove.md`
        margin-bottom: 4rem;
        --scroll-button-icon-size: 52px;
      `}

      .CarouselWidget__inner {
        flex-direction: column;
        align-items: center;
      }

      .CarouselWidget__header,
      .CarouselWidget__list {
        flex-basis: 100%;
        width: 100%;
      }

      .CarouselWidget__header {
        display: none;
      }

      .CarouselWidget__header .header__inner {
        padding-top: 0;
        padding-bottom: 4rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 450px;

        ${MQAbove.md`
          padding-bottom: 5rem;
        `}

        & > div {
          grid-column: 1 / 3;
          justify-content: center;

          &:nth-child(3),
          &:nth-child(4) { 
            margin-top: 0.25rem;
            margin-bottom: 0.75rem !important;
          }

          &:nth-child(3) {
            grid-column: 1 / 2;
            text-align: right !important;
            padding-right: 6px;
          }

          &:nth-child(4) {
            grid-column: 2 / 3;
            text-align: left !important;
            padding-left: 6px;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              width: 4px;
              height: 4px;
              border-radius: 100%;
              left: -2px;
              top: 40%;
              background: #fff;
            }
          }
        }
      }

      .CarouselWidget__list {
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
      }

      .R-ReviewsList-container {
        margin-right: 0;

        .controlButton__icon {
          border: 1px solid #9F8DE5;
          padding: 6px;
          border-radius: 100%;
        }

        ${MQBelow.md`
          .R-ReviewsList__controlButton {
            margin: unset;
            top: unset;
            bottom: calc(var(--scroll-button-icon-size) * -2 * 1.5);
          }

          .R-ReviewsList__controlButton--left {
            left: 1.5rem;
          }

          .R-ReviewsList__controlButton--right {
            right: 1.5rem;
          }
        `}

        ${MQAbove.md`
          .R-ReviewsList__controlButton {
            height: 100%;
            border-radius: 0;
            font-size: 24px;
          }
        `}
      }

      .R-ReviewsList {
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        padding-bottom: 0;
        padding-top: 0;
  
        .R-ReviewsList__item {
          padding: 0;
  
          .item__inner {
            border-left: none;
            border-top: none;
            border-bottom: none;
            padding-top: 2rem;
            padding-bottom: 2rem;

            ${MQAbove.md`
              padding: 2.5rem;
            `}
          }
        }

        .R-ReviewsList__item--body {
          ${MQAbove.md`
            font-size: 1rem;
          `}
        }
      }

      .R-flex-between-xxs {
        justify-content: flex-start;
      }
      
      .R-TextBody--xxxxs {
        font-size: .875rem;
        color: #fff;
        text-align: left !important;

        & + .R-TextBody--xxxxs {
          font-size: .75rem;
          font-weight: 500;
          text-transform: uppercase;
        }
      }

      .cssVar-authorName,
      .cssVar-header__heading {
        --author-text-transform: capitalize;

        ${MQAbove.md`
          font-size: 1.125rem;
        `}
      }

      .R-ReviewsList-container .R-ReviewsList__controlButton .controlButton__icon {  
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ricon-thin-arrow--left:before,
      .ricon-thin-arrow--right:before {
        font-size: 13px;
      }
    }
  `;

ReviewsCarousel.propTypes = {
  primary: PropTypes.shape({
    cta_label: PrismicText,
    cta_link: PrismicDoc,
    cta_color: PropTypes.string,
    cta_text_color: PropTypes.string,
    cta_font_weight: PropTypes.string,
    cta_style: PropTypes.string,
  }),
};

export default ReviewsCarousel;
