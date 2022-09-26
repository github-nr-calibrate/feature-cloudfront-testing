import React from 'react';
import styled, { css } from 'styled-components';
import { RichText, Text } from 'components/Text';
import * as prismicH from '@prismicio/helpers';
import PropTypes, { PrismicDoc } from 'types';
import ResponsiveImage from 'components/ResponsiveImage';
import { Link } from 'components/Link';
import { MQAbove } from 'styles/mediaQueries';
import { hasText } from 'utils';
import { ArrowButton } from 'components/ArrowButton';

function PostTout({ post, variant }) {
  const {
    title,
    author,
    date_published,
    featured_image,
    excerpt,
    categories,
  } = post.data;

  if (variant === 'hero') {
    return (
      <CardHero href={`/resources/${post.uid}`} aria-label={prismicH.asText(title)}>
        <CardTextContainer variant={variant}>
          <div>
            { categories.map(({ category }, i) => (
              <Category key={i} variant={variant}>
                {category || 'Uncategorized'}
              </Category>
            ))}
            {hasText(title) && (
            <Text as="h2" typeStyle="h3" marginBottom={['1rem',, '1.5rem']} variant={variant}>
              {prismicH.asText(title)}
            </Text>
            )}
            {hasText(excerpt) && (
            <CardExcerpt typeStyle="bodyL">
                {excerpt}
            </CardExcerpt>
            )}
            <CardDetails typeStyle="labelsM" color="textMediumLight">
              {`by ${author.data ? author.data.name : 'Unknown'} on ${date_published}`}
            </CardDetails>
            <ArrowButton cta_label="Read More" mt="1.25rem" />
          </div>
        </CardTextContainer>
        <CardImageContainer variant={variant}>
          <ResponsiveImage src={featured_image} crop="center" />
        </CardImageContainer>
      </CardHero>
    );
  }

  return (
    <Card href={`/resources/${post.uid}`} aria-label={prismicH.asText(title)}>
      <CardImageContainer>
        { categories.map(({ category }, i) => (
          <Category key={i} variant={variant}>
            {category || 'Uncategorized'}
          </Category>
        ))}
        <ResponsiveImage src={featured_image} crop="center" />
      </CardImageContainer>
      <CardTextContainer>
        <div>
          {hasText(title) && (
          <CardTitle as="h2" typeStyle="h5" className="CardTitle">
            <span>{prismicH.asText(title)}</span>
          </CardTitle>
          )}
          <CardDetails typeStyle="labelsM">
            <span>
              {`by ${author.data ? author.data.name : 'Unknown'}`}
            </span>
            <span>{date_published}</span>
          </CardDetails>
        </div>
      </CardTextContainer>
    </Card>
  );
}

const Card = styled(Link)`
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    .ResponsiveImage {
      transform: scale(1.1);
    }

    ${MQAbove.md`
      .CardTitle {
        span {
          background-size: 100% 2px;
        }
      }
    `}
  }
`;

const CardHero = styled(Link)`
  display: grid;
  gap: 1.5rem;

  ${MQAbove.md`
    grid-template-columns: 4fr 6fr;
    gap: 64px;
  `}

  .ArrowButton {
    color: var(--color__lavender);
  }

  &:hover {
    .ResponsiveImage {
      transform: scale(1.1);
    }
    
    .ArrowButton {
      &:after {
       transform: scaleX(1);
      }
    }
  }
`;

const Category = styled.div`
  ${({ variant }) => variant === 'hero' ? css`
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--color__textMediumLight);
    margin-bottom: 1rem;
  ` : css`
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    z-index: 2;
    background: white;
    padding: 0.5rem 1rem;
    text-transform: capitalize;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 160%;
    border-radius: 50px;

    ${MQAbove.md`
      font-size: 1rem;
    `}
  `}
`;

const CardTextContainer = styled.div`
  ${({ variant }) => variant === 'hero' ? css`
    display: flex;
    align-items: center;
    order: 2;

    ${MQAbove.md`
      order: 1;
      max-width: 25rem;
    `}
  ` : css`
    padding-top: 1rem;

    ${MQAbove.md`
      padding-top: 1.5rem;
    `}
  `}
`;

const CardImageContainer = styled.div`
  position: relative;
  padding-top: ${({ variant }) => variant === 'hero' ? '73.5%' : '85.7%'};
  overflow: hidden;
  background: var(--color__nightshade);

  ${MQAbove.md`
    padding-top: ${({ variant }) => variant === 'hero' ? '78%' : '93.75%'};
  `}
  
  ${({ variant }) => variant === 'hero' && css`
    order: 1;

    ${MQAbove.md`
      order: 2;
    `}
  `}
  
  .ResponsiveImage {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s ease-in-out;
  }
`;

const CardTitle = styled(Text)`
  ${({ variant }) => variant === 'hero' ? css`
    margin-bottom: 1.5rem;
    color: red;
  ` : css`
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.6;
    margin-bottom: 0.5rem;

    span {
      padding: 0.2rem 0;
      background-image: linear-gradient(90deg, var(--color__textDark) 0, var(--color__textDark));
      background-position: 0 100%;
      background-size: 0 2px;
      background-repeat: no-repeat;
      transition: background .24s ease-out;
    }

    ${MQAbove.md`
      font-size: 1.25rem;
    `}
  `}
`;

const CardDetails = styled(Text)`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color__textMediumLight);

  & > span:not(:last-child):after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: var(--color__textMediumLight);
    display: inline-block;
    margin: 2px 12px;
  }
`;

const CardExcerpt = styled(RichText)`
  margin-bottom: 1rem;

  ${MQAbove.md`
    margin-bottom: 1.5rem;
  `}
`;

PostTout.propTypes = {
  post: PrismicDoc,
  variant: PropTypes.string,
};

export default PostTout;
