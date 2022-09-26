import styled from 'styled-components';
import { Box } from './Box';

/**
 * Extension of [`<Box>`] with `display: grid`.
 *`<Grid>` has `grid-template-columns` and `grid-column-gap` applied,
 * corresponding  `theme.grid.columns` and `theme.grid.columnGap`, respectively.
 * `grid-template-columns` defaults to `repeat(n, 1fr)` to fill available space.
 */
export const Grid = styled(Box)
  .attrs(({ theme, gridColumnGap, gridTemplateColumns }) => {
    const { columnGap } = theme.grid;
    const columns = `repeat(${theme.grid.columns}, 1fr)`;

    return {
      display: 'grid',
      gridColumnGap: gridColumnGap ?? columnGap,
      gridTemplateColumns: gridTemplateColumns ?? columns,
    };
  })({});
