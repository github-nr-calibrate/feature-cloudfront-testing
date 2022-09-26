import React from 'react';
import Page from 'components/Page';
import { fetchMeta } from 'client/prismic';
import { Container, Flex } from 'components/Layout';
import { Button } from 'components/Button';
import { Text } from 'components/Text';

function Error() {
  return (
    <Flex backgroundColor="grey" color="nightshade">
      <Container>
        <Flex flexDirection="column" height={640} justifyContent="center" alignItems="center">
          <Text typeStyle="bodyS" uppercase>Error 404</Text>
          <Text typeStyle="h2" as="h2">
            Page&nbsp;
            <strong>Not Found</strong>
          </Text>
          <Button href="/" variant="primary" mt={4}>
            Return to Homepage
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const meta = await fetchMeta({ ...previewData });

  // pathname of the page for canonical tag
  meta.pathname = '404';

  return {
    props: {
      meta,
      preview,
      data: {
        title: 'Error 404',
      },
    },
  };
}

Error.layout = Page;

export default Error;
