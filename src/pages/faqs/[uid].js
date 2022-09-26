import React, { useEffect, useState } from 'react';
import PropTypes from 'types';
import styled from 'styled-components';
import { fetchAllByDocType, fetchByUID, mapStaticPaths } from 'client/prismic';
import { FooterlessPage } from 'components/Page';
import { Row, Col, Container } from 'components/Layout';
import { Text, TextField, TextFieldStyle } from 'components/Text';
import { RelatedFAQs } from 'components/FAQs/RelatedFAQs';
import Router from 'next/router';
import { useGlobalState } from 'client/state';

const BackLink = styled(Text)`
  font-size: 19px;
  font-weight: 500;
  line-height: 0;
  white-space: nowrap;
  span, &::before {
    display: inline-block;
    vertical-align: middle;
  }
  &::before {
    content: url("/icons/chevron-right.svg");
    transition: transform 0.3s ease;
    transform: rotate(180deg) scale(0.8);
    margin-right: 0.5rem;
    margin-left: -6px;
  }
  :hover {
    cursor: pointer;
    &::before {
      transform: rotate(180deg) translateX(5px) scale(0.8);
    }
  }
`;

function FAQ({ data }) {
  const [{ prevRoute }] = useGlobalState();
  const [backLink, setBackLink] = useState(false);

  // Since prevRoute updates before the next page load set state of backLink once on mount
  useEffect(() => {
    prevRoute && setBackLink(!backLink);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container pt={[3, 5]}>
        {backLink && (
          <BackLink display="block" pt={4} onClick={Router.back} onKeyUp={(e) => e.keyCode === 13 && Router.back()} tabIndex="0">
            <span>Back</span>
          </BackLink>
        )}
        <Row pt={4}>
          <Col span={[12, 10, 10]} mb={[4]}>
            <Text typeStyle="h4"><strong>{data.title}</strong></Text>
          </Col>
          <Col span={[12, 10, 7]} pb={5} mb={[5, 6]}>
            <TextFieldStyle>
              <TextField>{data.body}</TextField>
            </TextFieldStyle>
          </Col>
        </Row>
      </Container>
      {data.related_faqs.length > 1 ? <RelatedFAQs items={data.related_faqs} /> : null}
    </>
  );
}

FAQ.propTypes = {
  data: PropTypes.any,
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all FAQ documents
  const { results } = await fetchAllByDocType('faq');
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
  // If the route is like /faqs/what-is-calibrate, then params.uid = 'what-is-calibrate'
  const page = await fetchByUID('faq', params.uid, {
    fetchLinks: ['faq.title'],
    ...previewData,
  });

  // pathname of the page for canonical tag
  page.meta.pathname = `faqs/${params.uid}`;
  page.data.map_to_nav_item = '/faqs';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

FAQ.layout = FooterlessPage;
export default FAQ;
