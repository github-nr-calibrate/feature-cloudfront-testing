import styled from 'styled-components';
import { Box } from './Box';

/**
 * Extension of `<Box>` with max-width and padding applied.
 * This is used as a page or section wrapper.
 */
export const Container = styled(Box).attrs(({
  theme,
  isFullscreen = false,
  paddingX,
  maxWidth,
}) => {
  let containerWidth = maxWidth || theme.grid.maxWidth;

  if (Array.isArray(containerWidth)) {
    containerWidth = ['100%', ...theme.grid.maxWidth];
  }
  return {
    width: '100%',
    marginX: 'auto',
    paddingX: paddingX || theme.grid.margins,
    maxWidth: containerWidth,
    minHeight: isFullscreen && 'calc(100vh - 62px)',
  };
})({});
