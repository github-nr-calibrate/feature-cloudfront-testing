import styled from 'styled-components';
import { Flex } from './Flex';
import { calcRowGutter } from './utils';

/**
 * Extension of `<Flex>` with negative margins.
 * Intended to wrap `<Col>` components for bootstrap-style flexbox grid.
 * Margins are tied to the `theme.grid.columnGap` property.
 * `flex-direction: row` and `flex-wrap: wrap` are enabled by default.
 */
export const Row = styled(Flex).attrs(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginX: calcRowGutter(theme.grid.columnGap),
}))({});
