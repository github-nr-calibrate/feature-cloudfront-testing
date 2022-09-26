import React from 'react';
import PropTypes, { RichText as RichTextType, PrismicLink } from 'types';
import { Container } from 'components/Layout';
import { RichText } from 'components/Text';
import { setCookie } from 'nookies';
import { useGlobalState, cookies } from 'client/state';
import { darken } from 'polished';
import { Link } from 'components/Link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function Banner({
  copy, url, show, query_string,
}) {
  const router = useRouter();

  // data and helpers
  const [{ bannerShown }, { setBannerShown }] = useGlobalState();

  const hideBanner = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCookie(null, cookies.banner, '1', { maxAge: 30 * 24 * 60 * 60 }); // 30 days
    setBannerShown(false);
  };

  const doesNotMatch = (string) => {
    if (string && !router.asPath.includes(string)) {
      return true;
    }
    return false;
  };

  // rendering
  if (!show || !bannerShown || doesNotMatch(query_string)) {
    return null;
  }

  return (
    <BannerContainer doc={url}>
      <Container position="relative">
        <BannerText px="3" typeStyle="bodyS" uppercase pr="0" pl="0">{copy}</BannerText>
      </Container>
      <CloseButton onClick={(e) => hideBanner(e)}>&times;</CloseButton>
    </BannerContainer>
  );
}

// Styles
const BannerContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding-right: 10px;
  background-color: var(--color__nightshadeLight);
  color: #fff;
  transition: background-color 0.3s ease;
  cursor: pointer;
  line-height: 32px;
  text-align: center;
  :hover {
    background-color: ${darken(0.05, '#454B90')};
  }
  :focus {
    background-color: var(--color__nightshade);
    outline-offset: -3px;
  }
  @media only screen and (max-width: 40rem) {
    text-align: left;
  }
`;

const BannerText = styled(RichText)`
  display: inline-block;
  line-height: 1;
  margin: 10px 0;
`;

const CloseButton = styled.button`
  font-size: 1.75rem;
  line-height: 0.7;
  overflow: hidden;
  border: 0;
  background: none;
  color: #fff;
  transition: opacity 0.2s ease-in-out;
  :hover {
    opacity: 0.7;
  }
`;

// props and export
Banner.propTypes = {
  copy: RichTextType,
  url: PrismicLink,
  query_string: PropTypes.string,
  show: PropTypes.bool,
};

export default Banner;
