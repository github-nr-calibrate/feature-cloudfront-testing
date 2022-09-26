import styled from 'styled-components';
import { Box } from './Box';

/**
 * Extension of `<Box>` with `display: flex`.
 */
export const Flex = styled(Box).attrs({
  display: 'flex',
})({});
