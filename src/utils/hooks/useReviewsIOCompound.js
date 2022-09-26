import { useEffect } from 'react';

function useReviewsIOCompound() {
  useEffect(() => {
    const reviewsScript = window.document.createElement('script');
    reviewsScript.src = 'https://widget.reviews.io/rich-snippet-reviews-widgets/dist.js';
    reviewsScript.onload = () => {
      richSnippetReviewsWidgets('compound-widget', {
        store: 'join-calibrate',
        primaryClr: '#8f67e9',
        neutralClr: '#211e3f',
        reviewTextClr: '#211e3f',
        widgetName: 'compound',
        layout: 'fullWidth',
        numReviews: 40,
        contentMode: 'company;third-party',
        compound: 'google local',
      });
    };
    window.document.body.append(reviewsScript);
  }, []);
}

export default useReviewsIOCompound;
