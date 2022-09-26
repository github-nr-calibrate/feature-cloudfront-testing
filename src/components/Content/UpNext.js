import React from 'react';
import styled from 'styled-components';

const UpNext = (data) => (
  <Component className="up-next">
    <Label>NEXT UP</Label>
    <Cta>{data.primary.call_to_action[0].text}</Cta>
  </Component>
  );

const Component = styled.div`
  background: #9c8fdf;
  color: #fff;
  padding: 1.5em;
  font-size: 2em;
  font-weight: bold;
  margin: 1em 0;
  text-align: center;
`;

const Label = styled.div`
  letter-spacing: -0.1em;
  font-weight: 300;
`;

const Cta = styled.div`
  max-width: 700px;
  margin: 0 auto;
  font-weight: 700;
`;

export default UpNext;
