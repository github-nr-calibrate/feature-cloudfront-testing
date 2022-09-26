import React, { useEffect, useState } from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage } from 'types';
import { Flex, Box } from 'components/Layout';
import { RichText } from 'components/Text';
import { useInView } from 'react-hook-inview';
import styled from 'styled-components';

function ChatGraphic({ items, ...rest }) {
  const [container, inView] = useInView({ unobserveOnEnter: true });
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setShowChat(true), 10);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  return (
    <Flex
      ref={container}
      maxWidth="100%"
      flexDirection="column"
      justifyContent="center"
      mr={[0,, '2.875rem']}
      {...rest}
    >
      {inView && items.map(({ message_origin, chat_text, chat_profile_image }, index) => (
        <Flex
          maxWidth="100%"
          key={`chat_${index}`}
          pl={message_origin && '2.75rem'}
          pr={!message_origin && '2.75rem'}
          pt={index > 0 && '3.625rem'}
        >
          <Image
            order={message_origin ? 2 : 0}
            ml={message_origin && '1.25rem'}
            mr={!message_origin && '1.25rem'}
            mt="auto"
            as="img"
            border="4px solid"
            borderColor={message_origin ? 'lavenderLight' : 'white'}
            src={chat_profile_image.url}
            borderRadius="50%"
            height="4rem"
            width="4rem"
            flexShrink="0"
            aria-hidden
            showChat={showChat}
            index={index}
          />
          <Bubble
            bg={message_origin ? 'lavenderLight' : 'white'}
            p="1.625rem"
            color={message_origin ? 'white' : 'nightshade'}
            messageOrigin={message_origin}
            index={index}
            order="1"
            position="relative"
            width="100%"
            showChat={showChat}
          >
            <RichText zIndex="1" typeStyle="bodyM">{chat_text}</RichText>
            <Box
              color={message_origin ? 'lavenderLight' : 'white'}
              position="absolute"
              bottom="1px"
              right={message_origin && '-7px'}
              left={!message_origin && '-7px'}
              height="20px"
              style={{ transform: `rotateY(${(message_origin ? 0 : 180)}deg)` }}
              zIndex="0"
            >
              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 6.05807C11 3.26314 8.73483 0.997109 5.9399 0.996053V0.996053C3.14348 0.994997 0.875977 3.26165 0.875977 6.05807V20.7652C0.875977 20.8925 0.979182 20.9957 1.10649 20.9957V20.9957L16.5232 20.9973C17.6125 20.9975 18.285 19.8086 17.7236 18.875L11.7499 8.94157C11.2592 8.12563 11 7.19148 11 6.23936V6.05807Z" fill="currentColor" />
              </svg>
            </Box>
          </Bubble>
        </Flex>
      ))}
    </Flex>
  );
}

const Image = styled(Box)`
  object-fit: cover;
  object-position: center;
  transform-origin: center;
  transition: transform 0.5s ease;
  transition-delay: ${({ index }) => `${index * 0.75}s`};
  transform: ${({ showChat }) => (showChat ? 'scale(1)' : 'scale(0)')};
`;

const Bubble = styled(Box)`
    box-shadow:
      0px 1.23656px 2.43877px rgba(33, 30, 63, 0.0217013),
      0px 3.12736px 6.16784px rgba(33, 30, 63, 0.0310596),
      0px 6.37951px 12.5818px rgba(33, 30, 63, 0.0389404),
      0px 13.1406px 25.9162px rgba(33, 30, 63, 0.0482987),
      0px 36px 71px rgba(33, 30, 63, 0.07);
    border-radius: 11px;
    transform-origin: bottom ${({ messageOrigin }) => (messageOrigin ? 'right' : 'left')};;
    transition: transform 0.75s ease;
    transition-delay: ${({ index }) => `${index * 0.25}s`};
    transform: ${({ showChat }) => (showChat ? 'scale(1)' : 'scale(0)')};
`;

ChatGraphic.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message_origin: PropTypes.bool,
    chat_text: PrismicText,
    chat_profile_image: PrismicImage,
  })),
};

export default ChatGraphic;
