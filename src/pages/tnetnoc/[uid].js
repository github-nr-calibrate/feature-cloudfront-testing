/* eslint-disable react/prop-types */
import React from 'react';
import { fetchByUID, fetchAllByDocType, mapStaticPaths } from 'client/prismic';
import { Container } from 'components/Layout';
import { SliceZone } from 'components/SliceZone';
import {
  RichText, SectionHero, LessonHero, SectionTracker,
}
  from 'components/Content';
import styled from 'styled-components';
import { BasicPage } from 'components/Page';

export async function getStaticProps({ preview = false, previewData, params }) {
  // get the page data
  const page = await fetchByUID('content_item', params.uid, { ...previewData });

  // hidden from search by default
  page.data.hide_from_search = true;

  // all slices are made printable and assigned a "section" number
  // this allows us to turn off sections for printing
  let section = -1;
  page.data.body.forEach((slice) => {
    slice._printable = true;
    if (slice.slice_type === 'section_hero') section += 1;
    slice._section = section;
  });

  // pathname of the page for canonical tag
  page.meta.pathname = `tnetnoc/${params.uid}`;

  return { props: { ...page, preview } };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all Content Items
  const { results } = await fetchAllByDocType('content_item');
  const paths = mapStaticPaths(results, 'uid');

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const padding = urlParams.get('padding');
    const tracking = urlParams.get('tracking');
    const print = urlParams.get('print');
    this.setState({ padding, tracking, print });
  }

  render() {
    // temp: custom slice reference
    const customSlices = [
      { type: 'section_hero', Component: SectionHero },
      { type: 'lesson_hero', Component: LessonHero.bind(this) },
      { type: 'rich_text_body', Component: RichText },
      // { type: 'section_saver', Component: SectionSaver.bind(this) },
      // { type: 'up_next', Component: UpNext }
    ];

    return (
      <StyledContainer
        pb={[4, 4]}
        defaultPadding={this.state.padding}
        print={this.state.print}
      >
        <SliceZone slices={this.state.data.body} custom={customSlices} />
        {
          // eslint-disable-next-line eqeqeq
          this.state.tracking != 'false' && <SectionTracker />
        }
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  padding: ${({ defaultPadding }) => (defaultPadding === 'false' ? '0 !important' : null)};

  ${({ print }) => print === 'true' && `
    @media print {
    .lesson-hero, 
      .up-next {
        background: transparent;
        border: 1px solid #211e3f;
      }
      .lesson-hero *,
      .up-next * {
        color: #211e3f;
      }
      p {
        + p,
        + ul,
        + ol
        + h1, + h2, + h3, + h4, + h5, + h6 {
          margin-top: 1em;
        }
      }
      ul {    
        li {
          margin-bottom: 1rem;
        }
      }
    }`
  }
`;

ContentItem.layout = BasicPage;
export default ContentItem;
