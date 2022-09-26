import React from 'react';
import PropTypes from 'types';
import { fetchAllByDocType, fetchByUID, mapStaticPaths } from 'client/prismic';
import { FooterlessPage } from 'components/Page';
import {
  Box, Row, Col, Container,
} from 'components/Layout';
import { Text, TextField, TextFieldStyle } from 'components/Text';
import { RichText } from 'components/Content';
import { SliceZone } from 'components/SliceZone';

function Legal({ data }) {
  const date = new Date(data.last_updated)
    .toLocaleDateString('en-US', {
      timeZone: 'UTC',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const customSlices = [{ type: 'rich_text_body', Component: RichText }];

  return (
    <Container>
      <Row pt={[4, 5]}>
        <Col span={[12, 10, 8]} margin="auto" css="max-width: 700px;">
          <Text as="h1" typeStyle="p1" mb={3}><strong>{data.title}</strong></Text>
          <Text as="div" typeStyle="bodyS" mb={4}>
            Last updated:
            <strong>{date}</strong>
          </Text>
          <Box mb={[5, 6]}>
            <TextFieldStyle>
              <TextField>{data.body}</TextField>
            </TextFieldStyle>
            <SliceZone slices={data.body1} custom={customSlices} />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}

Legal.propTypes = {
  data: PropTypes.any,
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all 'legal' documents
  const { results } = await fetchAllByDocType('legal');
  const paths = mapStaticPaths(results, 'doc');

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params, preview = false, previewData }) {
  const page = await fetchByUID('legal', params.doc, { ...previewData });

  // pathname of the page for canonical tag
  page.meta.pathname = `legal/${params.doc}`;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

Legal.layout = FooterlessPage;
export default Legal;
