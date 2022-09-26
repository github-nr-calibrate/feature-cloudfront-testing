import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import PropTypes, { PrismicImage } from 'types';
import Imgix from 'react-imgix';
import styled from 'styled-components';
import { Box } from 'components/Layout';
import { useMatchMedia, usePrefersReducedMotion } from 'utils/hooks';
import { lessThan } from 'styles/media';
import VisibilitySensor from 'react-visibility-sensor';

const ImageBox = styled(Box)`
  position: ${({ $fluid }) => $fluid ? 'absolute' : 'relative'};
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  min-height: 1px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    position: absolute;
    left: 0;
    top: 0;
  }

  svg {
    width: 100%;
  }
`;

const FluidBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  padding-top: ${({ paddingTop }) => paddingTop};

  img {
    object-fit: contain;
  }
`;

function ResponsiveImage({
  src, ratio = '0', fluid, className, crop = 'faces', svgAsImage = false,
}) {
  const isPrefersReducedMotion = usePrefersReducedMotion();

  // Function to get the aspect ratio of the image
  const calculateRatio = (ratio) => {
    let paddingTop;

    if (typeof ratio === 'string' && ratio.includes(':')) {
        const ratioArray = ratio.split(':');
        paddingTop = ratioArray[1] / ratioArray[0] * 100;
      } else if (typeof ratio === 'string' && ratio.includes('/')) {
        const ratioArray = ratio.split('/');
        paddingTop = ratioArray[1] / ratioArray[0] * 100;
      } else {
        paddingTop = ratio * 100;
      }

    return `${paddingTop}%`;
  };

  // Calculate the image ratio for each item in the array
  const calculateRatioSizes = (ratios) => ratios.map((ratio) => calculateRatio(ratio));

  const paddingBottom = Array.isArray(ratio)
    ? calculateRatioSizes(ratio) : calculateRatio(ratio);

  // Art direction for mobile images
  const isMobile = useMatchMedia(lessThan('sm'));
  const imageSrc = isMobile && src.mobile ? src.mobile.url : src.url;

  const calculateFluidRatio = (src) => {
    const { width, height } = isMobile && src.mobile ? src.mobile.dimensions : src.dimensions;
    const calculatedHeight = Math.round((height / width) * 100);
    if (calculatedHeight > 100) {
      return '100%';
    }
    return `${Math.round((height / width) * 100)}%`;
  };

  // Set the initial state for the image
  const ImageRef = useRef();
  const ImageBoxRef = useCallback(node => {
    if (node !== null) {
      setHeight(Math.round(node.getBoundingClientRect().height / 100) * 100);
      setWidth(Math.round(node.getBoundingClientRect().width / 100) * 100);
    }
  }, []);

  const [windowWidth, setWindowWidth] = useState(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (windowWidth - window.innerWidth > 99 || window.innerWidth - windowWidth > 99) {
        // Updating the state here causes the image to re-render
        setWindowWidth(window.innerWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // Set windowWidth to the current window width on mount
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Update state and cause re-render if isPrefersReducedMotion changes
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [isPrefersReducedMotion]);

  // For SVG images wait till it's in view then fetch the SVG content
  useEffect(() => {
    if (imageSrc && imageSrc.endsWith('.svg') && isVisible && !svgAsImage) {
      fetch(imageSrc).then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      }).then(text => {
        setSvgContent(text);
      });
    }
  }, [imageSrc, isVisible, svgAsImage]);

  if (!imageSrc) {
    return null;
  }

  // Render SVG's inline
  if (imageSrc.endsWith('.svg') && !svgAsImage) {
    return (
      <VisibilitySensor
        onChange={onChange}
        offset={{ top: 0 }}
        partialVisibility
      >
        {isVisible ? (
          <ImageBox
            className={`${className || ''} ResponsiveImage`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
           ) : (<ImageBox />)}
      </VisibilitySensor>
    );
  }

  function onChange(visible) {
    if (visible) {
      setIsVisible(true);
    }
  }

  const Image = () => {
    // If there is no height the image isn't visible yet so load it when it becomes visible
    if (height === 0) {
      return (
        <VisibilitySensor
          onChange={onChange}
          offset={{ top: 0 }}
          partialVisibility
        >
          <ImageBox
            ref={ImageBoxRef}
            pb={paddingBottom}
            $fluid={fluid}
            className={`${className || ''} ResponsiveImage`}
          >
            {isVisible && (
            <Imgix
              src={imageSrc}
              width={width}
              height={height}
              htmlAttributes={{
                alt: src.alt,
                ref: ImageRef,
              }}
              imgixParams={{
                fit: fluid ? 'clip' : 'crop',
                crop,
              }}
              disablePathEncoding
            />
            )}
          </ImageBox>
        </VisibilitySensor>
      );
    }

    // Otherwise the image is visible and we can render it normally with lazy loading
    return (
      <ImageBox
        ref={ImageBoxRef}
        pb={paddingBottom}
        $fluid={fluid}
        className={`${className || ''} ResponsiveImage`}
      >
        <Imgix
          src={imageSrc}
          width={width}
          height={height}
          className="lazyload"
          attributeConfig={{
            src: 'data-src',
            srcSet: 'data-srcset',
            sizes: 'data-sizes',
          }}
          htmlAttributes={{
            alt: src.alt,
            ref: ImageRef,
          }}
          imgixParams={{
            fit: fluid ? 'clip' : 'crop',
            crop,
          }}
          disablePathEncoding
        />
      </ImageBox>
    );
  };

  return (
    fluid ? <FluidBox paddingTop={calculateFluidRatio(src)}><Image /></FluidBox> : <Image />
  );
}

ResponsiveImage.propTypes = {
  src: PrismicImage,
  ratio: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  fluid: PropTypes.bool,
  className: PropTypes.string,
  crop: PropTypes.string,
  svgAsImage: PropTypes.bool,
};
export default React.memo(ResponsiveImage);
