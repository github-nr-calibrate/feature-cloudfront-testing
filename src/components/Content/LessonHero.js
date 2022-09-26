import React from 'react';
import { MQBelow } from 'styles/mediaQueries';
import styled from 'styled-components';
import { slugify } from 'utils';

const LessonHero = (data) => (
  <Component
    className="lesson-hero"
    id={data.primary.title && data.primary.title[0] && slugify(data.primary.title[0].text)}
  >
    <Topic>
      {data.primary.topic && data.primary.topic[0] ? data.primary.topic[0].text || '' : ''}
    </Topic>
    <Label>
      {data.primary.label && data.primary.label[0] ? data.primary.label[0].text || '' : ''}
    </Label>
    <Title>
      {data.primary.title && data.primary.title[0] ? data.primary.title[0].text || '' : ''}
    </Title>
  </Component>
  );

// Styles
const Component = styled.div`
  background: var(--color__textDark);
  color: #fff;
  margin: 0 0 2rem 0;
  padding: 3rem;
  text-align: center;
  ${MQBelow.md`
    padding: 1.5em;
  `}
`;

const Topic = styled.div`
  color: var(--color__lavenderLight);
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 800;
`;

const Label = styled.div`
  color: var(--color__lavenderLight);
  font-size: 2.8rem;
  font-family: var(--font__display);
  font-weight: 300;
  ${MQBelow.md`
    font-size: 2rem;
  `}
`;

const Title = styled.h1`
  font-size: 2.8rem;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 800;

  ${MQBelow.md`
    font-size: 2rem;
  `}
`;

export default LessonHero;
