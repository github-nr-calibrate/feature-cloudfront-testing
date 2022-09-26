import React, { useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import PropTypes from 'types';
import styles from './Animation.module.css';

function Animation({ name, children }) {
  const animatedEl = useRef();

  const clonedChildren = React.Children.map(children, child => React.cloneElement(child, {
    className: `${child.props.className ? child.props.className : ''}`,
    ref: animatedEl,
  }));

  function onChange(isVisible) {
    if (isVisible) {
      animatedEl.current?.classList.remove(styles.animatedHidden, styles.animated);
      animatedEl.current?.classList.add(styles.animated, styles[name]);
    } else if (!isVisible) {
      animatedEl.current?.classList.add(styles.animatedHidden);
    }
  }

  if (name === 'reveal') {
        return (
          <VisibilitySensor
            onChange={onChange}
            offset={{ top: 10 }}
            partialVisibility
          >
            <div ref={animatedEl}>{children}</div>
          </VisibilitySensor>
        );
    }

  return (
    <VisibilitySensor
      onChange={onChange}
      offset={{ top: 10 }}
      partialVisibility
    >
      <>{clonedChildren}</>
    </VisibilitySensor>
  );
}

Animation.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

export default Animation;
