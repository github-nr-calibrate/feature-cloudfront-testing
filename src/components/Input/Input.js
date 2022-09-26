import React from 'react';
import styled, { css } from 'styled-components';
import {
  space, layout, compose, border, color, typography,
} from 'styled-system';

const inputBase = css`
  appearance: none;
  border: 1px solid;
  borderColor: 'nightshadeLightFaded';
  border-radius: 3px;
  color: inherit;
  font-size: 1rem;
  line-height: 1;
  height: 36px;
  padding: 1em;
  position: relative;
`;

const inputComposition = compose(space, layout, border, color, typography);

const StyledInput = styled.input(
  inputBase,
  inputComposition,
);

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(({ ...rest }) => <StyledInput {...rest} />);

export default Input;
