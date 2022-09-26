import React, { useEffect, useState } from 'react';
import PropTypes, { PrismicImage, PrismicLink, RichText as PrismicText } from 'types';
import { Box, Flex } from 'components/Layout';
import { RichText, Text } from 'components/Text';
import { parseDDColor } from 'client/prismic';
import styled from 'styled-components';
import ResponsiveImage from 'components/ResponsiveImage';
import { Link } from 'components/Link';
import { Modal } from 'components/Modal';
import { VideoPlayer } from 'components/VideoPlayer';
import { PlayButton } from 'components/PlayButton';

const CardBox = styled(Box)`
  transform: ${({ transform }) => transform};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: transform 1s;
  transform-style: preserve-3d;

  strong {
    color: ${({ strongColor }) => strongColor};
  }

  button& {
    padding: 0;
  }

  a &,
  button &,
  button& {
    transition: box-shadow 0.4s ease;
    white-space: normal;
  }

  a:hover &,
  button:hover &,
  button&:hover {
    box-shadow:
      0px 1.23656px 2.43877px rgba(33, 30, 63, 0.0217013),
      0px 3.12736px 6.16784px rgba(33, 30, 63, 0.0310596),
      0px 6.37951px 12.5818px rgba(33, 30, 63, 0.0389404),
      0px 13.1406px 25.9162px rgba(33, 30, 63, 0.0482987),
      0px 26px 51px rgba(33, 30, 63, 0.07);

    .PlayButton {
      color: white;
      background: var(--color__lavender);
      border-color: var(--color__lavender);
    }
  }
`;

const Card = ({ item, width, ...rest }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateY, setRotateY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    icon_image,
    image_size,
    item_body_copy,
    item_link,
    flip_label,
    flip_body_copy,
    background_color,
    text_color,
    video_overlay,
    video_url,
    video_file,
  } = item;

  const isLink = !!item_link && item_link.link_type !== 'Any';
  const hasModalVideo = video_overlay
    && ((!!video_url && !!video_url.url)
    || (!!video_file && !!video_file.url));

  useEffect(() => {
    if (flip_body_copy) {
      isFlipped ? setRotateY(180) : setRotateY(0);
    }
  }, [isFlipped, flip_body_copy]);

  const flip = () => setIsFlipped(prev => !prev);
  const hasBackBodyCopy = !!flip_body_copy?.length && !!flip_body_copy[0].text.length;

  const ImageProps = {
    icon: {
      height: '2rem', width: '2rem', mt: 4, mx: 4, justify: 'left',
    },
    story: {
      height: '13.15rem', width: '15rem', mt: 4, mx: 3, justify: 'center',
    },
    dynamic: {
      height: '13.15rem', width: '100%', mt: 4, mx: 4, justify: 'center',
    },
    portrait: {
      height: '19rem', width: '15rem', mt: 4, mx: 4, justify: 'center',
    },
    fullWidth: {
      height: '16rem', width: '19rem', mt: 0, mx: 0, justify: 'center',
    },
  };

  const cardBox = (
    <CardBox
      bg={parseDDColor(background_color)}
      color={parseDDColor(text_color)}
      borderRadius="3px"
      minHeight="25rem"
      position="relative"
      width={isLink ? 'auto' : width}
      transform={`rotateY(${rotateY}deg)`}
      strongColor={`${parseDDColor(text_color)}`}
      ref={ref}
      as={hasModalVideo && 'button'}
      onClick={() => hasModalVideo && setIsModalOpen(true)}
      aria-label={hasModalVideo && 'Play video in overlay'}
      {...rest}
    >
      <Flex
        height="100%"
        minHeight="20.4rem"
        style={{ backfaceVisibility: 'hidden' }}
        flexDirection="column"
        textAlign="left"
        alignItems="left"
      >
        {!!icon_image?.url
          && (
            <Flex
              alignItems="center"
              justifyContent={ImageProps[image_size]?.justify}
            >
              <Box
                position={hasModalVideo && 'relative'}
                mt={ImageProps[image_size]?.mt}
                mx={ImageProps[image_size]?.mx}
                mb={4}
                height={ImageProps[image_size]?.height}
                width={ImageProps[image_size]?.width}
              >
                {icon_image?.url && (
                <ResponsiveImage src={icon_image} />
                )}
                {hasModalVideo && (
                <PlayButton
                  variant={image_size !== 'icon' ? 'secondary' : 'primary'}
                  shadow={image_size !== 'icon'}
                  top={image_size !== 'icon' ? '' : '-0.25rem'}
                  bottom={image_size !== 'icon' ? '1rem' : ''}
                  left={image_size !== 'icon' ? '1rem' : 'calc(100% + 1rem)'}
                />
                )}
              </Box>
            </Flex>
          )}
        <Box>
          <RichText
            textAlign="start"
            typeStyle="bodyM"
            px={4}
          >
            {item_body_copy}
          </RichText>
          <Box
            px={4}
            pb={4}
            mt="auto"
            alignSelf="start"
            onClick={hasBackBodyCopy ? flip : undefined}
          >
            {!isLink && hasBackBodyCopy && (
              <RichText
                typeStyle="bodyM"
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                {flip_label}
              </RichText>
            )}
          </Box>
        </Box>
      </Flex>
      {!isLink && hasBackBodyCopy && (
      <Flex
        position="absolute"
        top={4}
        right={4}
        left={4}
        flexDirection="column"
        height="calc(100% - 64px)"
        style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
      >
        <RichText
          textAlign="start"
          typeStyle="bodyM"
        >
          {flip_body_copy}
        </RichText>
        <Flex
          mt="auto"
          alignSelf="start"
          justifyContent="flex-end"
          onClick={flip_body_copy && flip}
        >
          <Text
            typeStyle="bodyM"
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Back
          </Text>
        </Flex>
      </Flex>
      )}
    </CardBox>
  );

  return (
    isLink && !hasModalVideo ? (
      <Link
        doc={item_link}
        padding={0}
        width={width}
      >
        {cardBox}
      </Link>
    ) : (
      <>
        {cardBox}
        {hasModalVideo && (
          <Modal
            open={isModalOpen}
            close={() => setIsModalOpen(false)}
          >
            <VideoPlayer {...item} isInModal />
          </Modal>
        )}
      </>
    )
  );
};

Card.propTypes = {
  item: PropTypes.shape(PropTypes.shape({
    icon_image: PrismicImage,
    image_size: PropTypes.string,
    item_link: PrismicLink,
    item_body_copy: PrismicText,
    flip_label: PrismicText,
    flip_body_copy: PrismicText,
    background_color: PropTypes.string,
    text_color: PropTypes.string,
    video_overlay: PropTypes.boolean,
    video_url: PrismicLink,
    video_file: PrismicLink,
  })),
  width: PropTypes.array,
};

export default React.forwardRef(Card);
