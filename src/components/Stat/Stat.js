import React from 'react';
import { Text } from 'components/Text';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
import PropTypes from 'types';

function Stat({
  number, prefix, suffix, duration = 1,
}) {
  return (
    <Text typeStyle="numbers">
      <VisibilitySensor
        offset={{ top: 10 }}
        partialVisibility
      >
        {({ isVisible }) => (
          <CountUp
            end={number}
            start={isVisible}
            prefix={prefix === null ? '' : prefix}
            suffix={suffix === null ? '' : suffix}
            duration={duration}
          />
        )}
      </VisibilitySensor>
    </Text>
  );
}

Stat.propTypes = {
  number: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  duration: PropTypes.number,
};

export default Stat;
