import React from 'react';
import { Container } from 'components/Layout';
import { useReviewsIOCompound } from 'utils/hooks';

function ReviewsCompound() {
  useReviewsIOCompound();
  return (
    <Container pt={[3, 5]} pb={[3, 5]} textAlign="center">
      <div id="compound-widget" />
    </Container>
  );
}

export default ReviewsCompound;
