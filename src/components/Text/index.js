import styled from 'styled-components';

export { default as Text } from './Text';
export { default as TextField } from './TextField';
export { default as RichText } from './RichText';

export const TextFieldStyle = styled.div`
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.875rem;
  }

  p {
    font-weight: 400;

    + p,
    + ul,
    + ol {
      margin-top: 1.5rem;
    }

    + h1, + h2, + h3, + h4, + h5, + h6 {
      margin-top: 3.75rem;
    }
  }

  ul + p,
  ol + p {
    margin-top: 1.5rem;
  }

  a {
    text-decoration: underline;
    font-weight: 500;
  }

  ul {
    margin-left: 1.5rem;

    li {
      margin-bottom: 0.625rem;
      padding-left: 1.25rem;
      position: relative;
      list-style: none;
      font-weight: 400;

      &::before {
        content: url("https://www.joincalibrate.com/icons/arrow-right.svg"); // this has been changed as a result of ME-7; TODO: replace with env variable
        position: absolute;
        margin-left: -1.5rem;
      }
    }
  }

  img {
    max-width: 100%;
  }

  .embed {
    margin: 1.5rem auto;

    &.embed-youtube {
      padding-bottom: 56.25%;
      position: relative;
      
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
