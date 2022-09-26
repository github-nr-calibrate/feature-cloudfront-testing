import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { buildURL } from 'react-imgix';
import PropTypes, { PrismicImage } from 'types';

const BackgroundImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ imageSrc }) => imageSrc});
    background-position: ${({ bgPosition }) => bgPosition};
    background-repeat: no-repeat;
    background-size: ${({ bgSize }) => bgSize};
`;

function BackgroundImage({ src, bgPosition, bgSize = '100%' }) {
  const bgSizeInt = parseInt(bgSize.replace('%', ''), 10) / 100;
  const bgContainer = useRef();
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio);

    // Enable lazy loading on background images with lazysizes
    document.addEventListener('lazybeforeunveil', (e) => {
      const bg = e.target.getAttribute('data-bg');
      if (bg) {
        e.target.style.backgroundImage = `url(${ bg })`;
      }
    });
  }, []);

  useEffect(() => {
    if (bgContainer.current) {
      setDimensions({
        height: Math.ceil(bgContainer.current.clientHeight / 100) * 100
        * (bgSizeInt * devicePixelRatio),
        width: Math.ceil(bgContainer.current.clientWidth / 100) * 100
        * (bgSizeInt * devicePixelRatio),
      });
    }
  }, [bgContainer, devicePixelRatio, bgSizeInt]);

  useEffect(() => {
    setImageUrl(buildURL(src, { w: dimensions.width, h: dimensions.height, fit: 'clip' }));
  }, [devicePixelRatio, dimensions, src]);

  return (
    <BackgroundImageContainer
      ref={bgContainer}
      data-bg={imageUrl}
      bgPosition={bgPosition}
      bgSize={bgSize}
      className="lazyload"
    />
  );
}

BackgroundImage.propTypes = {
  src: PrismicImage,
  bgPosition: PropTypes.string,
  bgSize: PropTypes.string,
};

export default BackgroundImage;
