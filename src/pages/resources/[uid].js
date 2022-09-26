import React, { useEffect } from 'react';
import PropTypes from 'types';
import { fetchAllByDocType, fetchByUID, mapStaticPaths } from 'client/prismic';
import Page from 'components/Page';
import { Container, Flex } from 'components/Layout';
import styled from 'styled-components';
import { RichText, TextFieldStyle } from 'components/Text';
import { SliceZone } from 'components/SliceZone';
import { Button } from 'components/Button';
import { MQBelow } from 'styles/mediaQueries';

// todo: make into global slice?
const RichTextComponent = (data) => (
  <TextFieldStyle>
    <RichText>{data.primary.rich_text}</RichText>
  </TextFieldStyle>
);

// temp: custom slice reference
const customSlices = [{ type: 'rich_text', Component: RichTextComponent }];

function BlogPost({ data }) {
  useEffect(() => {
    // default all non joincalibrate links to open in a new tab
    const links = document.querySelectorAll('p a') || [];
    links.forEach((link) => {
      if (link.getAttribute('href').indexOf('joincalibrate.com') === -1) {
        link.setAttribute('target', '_blank');
      } else {
        link.setAttribute('target', '_parent');
      }
    });
  });

  const post_color = data.primary_color || '#9f8ce5';

  const printNextElem = (id) => {
    const css = `
      @media print {
        #__next * {
          display: none;
        }
        #__next #${id},
        #__next #${id} * {
          display: block !important;
        }
      }
    `;
    if (!document.print_styles) {
      document.print_styles = document.createElement('style');
      document.body.appendChild(document.print_styles);
    }
    document.print_styles.innerHTML = css;
    try {
      document.execCommand('print', false, null);
    } catch (e) {
      window.print();
    }
  };

  return (
    <Main id="print-me">
      {/* HERO */}
      <Hero bgColor={post_color}>
        <HeroText>
          <Arrow />
          {data.title && (
            <RichText typeStyle="bodyM">
              {data.title}
            </RichText>
          )}
          {data.subtitle && (
            <RichText typeStyle="bodyS">
              {data.subtitle}
            </RichText>
          )}
        </HeroText>
        <HeroImage src={data.featured_image.url} />
      </Hero>

      {/* BODY */}
      <Body pb={[4, 4]}>
        <Flex flexDirection="column">
          {/* todo: change body1 to body somehow... */}
          <SliceZone slices={data.body1} custom={customSlices} />
        </Flex>

        <Author>
          { data.author.data && data.author.data.image
            ? <img src={data.author.data.image.url} alt={data.author.data.image.alt} /> : <></>}
          <AuthorName>
            {data.author.data ? data.author.data.name || 'Calibrate' : 'Calibrate'}
          </AuthorName>
          {data.author.data.role && (
            <AuthorRole>
              {data.author.data.role}
            </AuthorRole>
          )}
          {data.author.data.bio && (
            <TextFieldStyle>
              <RichText>{data.author.data.bio}</RichText>
            </TextFieldStyle>
          )}
        </Author>
      </Body>

      {/* PRINT */}
      <PrintButton aria-label="print" onClick={() => printNextElem('print-me')}>
        <img
          alt=""
          style={{ width: '100%', height: '100%' }}
          src="https://images.prismic.io/calibrate/52c631c6-7f32-4211-a733-d04597b7574d_print.svg?auto=compress,format"
        />
      </PrintButton>
    </Main>
  );
}

// Styles
const Main = styled.section`
  margin-bottom: 0.6em;
`;

const Hero = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  position: relative;
  margin: 0 50px 2.4em 50px;
  display: grid;
  grid-template-columns: 4fr 6fr;
  align-items: center;

  ${MQBelow.md` {
    margin: 0 0 2.4em 0;
    grid-template-columns: 1fr;
  `}
`;

const HeroText = styled.div`
  color: #fff;
  padding: 1.5rem;
  max-width: 330px;
  margin-left: auto;

  h1, h2 {
    line-height: 1.1;
  }

  h2 {
    font-weight: 300;
  }

  ${MQBelow.md` {
    max-width: 100%;
    order: 2;
  `}
`;

const HeroImage = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-position: right;
  width: 100%;
  height: 100%;
  padding-bottom: 50%;

  ${MQBelow.lg` {
    padding-bottom: 40%;
  `}

  ${MQBelow.md` {
    width: 100%;
    padding-bottom: 50%;
    float: none;
  `}
`;

const Author = styled.div`
  background: var(--color__grey);
  padding: 2rem;
  margin: 2rem 0;
  img {
    max-width: 100px;
    float: left;
    margin-right: 20px;
  }
`;

const AuthorName = styled.p`
  font-weight: bold;
  margin: 0 auto 10px auto;
`;

const AuthorRole = styled.p`
  margin: 0 auto 10px auto;
`;

const Body = styled(Container)`
  max-width: 900px;
  h2 {
    font-family: "Caslon Doric Condensed", sans-serif;
    font-size: 3rem;
    text-transform: uppercase;

    strong {
      font-weight: 500;
      color: var(--color__lavenderLight);
    }
  }
  p {
    font-size: 1.1em;
    line-height: 1.25em;
  }
  p + h2,
  ul + h2 {
    margin: 3.125rem 0 0.625rem 0;
  }
  p + h3,
  ul + h3 {
    margin: 1.5rem 0;
  }
  h3 {
    font-size: 1.4rem;
  }
  ul {
    font-size: 1.1rem;
    line-height: 1.25rem;
  }
`;

const PrintButton = styled(Button)`
  display: none;
  width: 75px;
  height: 75px;
  background: var(--color__lavenderLight);
  padding: 15px;
  border-radius: 150px;
  margin: 50px auto;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20.8px 12px 0 12px;
  border-color: #fff transparent transparent transparent;
  margin-bottom: 4px;
`;

BlogPost.propTypes = {
  data: PropTypes.any,
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all Blog Post documents
  const { results } = await fetchAllByDocType('blog_post');
  const paths = mapStaticPaths(results, 'uid');

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params, preview = false, previewData }) {
  // params contains the documents 'uid'.
  // If the route is like /blog/this-is-a-test, then params.uid = 'this-is-a-test'
  const page = await fetchByUID('blog_post', params.uid, {
    fetchLinks: ['author.name', 'author.image', 'author.role', 'author.bio'],
    ...previewData,
  });

  // pathname of the page for canonical tag
  page.meta.pathname = `resources/${params.uid}`;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

BlogPost.layout = Page;
export default BlogPost;
