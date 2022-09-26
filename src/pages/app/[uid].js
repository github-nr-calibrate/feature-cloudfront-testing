import React from 'react';
import PropTypes from 'types';
import { fetchAllByDocType, fetchByUID, mapStaticPaths } from 'client/prismic';
import { FooterlessPage } from 'components/Page';
import { Row, Col, Container } from 'components/Layout';
import ResponsiveImage from 'components/ResponsiveImage';
import { TextField, TextFieldStyle } from 'components/Text';

function App({ data }) {
  // Prismic data
  const {
    title,
    image,
    body,
  } = data;

  return (
    <>
      <Container pt={[3, 5]} isFullscreen>
        <Row pt={4}>
          <Col span={[12, 8, 6]} mb={[4]}>
            <TextFieldStyle>
              <TextField>{title}</TextField>
              <TextField>{body}</TextField>
            </TextFieldStyle>
          </Col>
          <Col
            span={[12, 4, 4]}
            offset={[0,, 2]}
            pb={5}
            mb={[5, 6]}
          >
            {image?.url && (
              <ResponsiveImage
                src={image}
                fluid
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

App.propTypes = {
  data: PropTypes.any,
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all App documents
  const { results } = await fetchAllByDocType('app');
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
  // If the route is like /app/what-is-calibrate, then params.uid = 'what-is-calibrate'
  const page = await fetchByUID('app', params.uid, {
    fetchLinks: ['app.title'],
    ...previewData,
  });

  // pathname of the page for canonical tag
  page.meta.pathname = `app/${params.uid}`;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

App.layout = FooterlessPage;
export default App;
