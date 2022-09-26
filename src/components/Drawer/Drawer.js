import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import PropTypes, { ReactChild } from 'types';
import { MQAbove } from 'styles/mediaQueries';

Modal.setAppElement('#__next');

const StyledDrawer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: clamp(320px, 40vw, 500px);
    height: 100vh;
    background-color: #fff;
    padding: 60px 30px 30px;
    transform: translateX(${props => (props.open ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;

    ${MQAbove.md`
      padding: 60px;
    `}
`;

const CloseButton = styled.button`
    margin-left: auto;
    display: inherit;
    font-size: 2.5rem;
    position: absolute;
    top: 10px;
    right: 20px;

    &:hover {
      color: var(--color__lavender);
    }
`;

function Drawer({
  children, open, close,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  useEffect(() => {
    open ? openDrawer() : null;
  }, [open]);

  const openDrawer = () => {
    setModalIsOpen(true);
    const timer = setTimeout(() => {
      setDrawerIsOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
    close();
    const timer = setTimeout(() => {
      setModalIsOpen(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    modalIsOpen && (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeDrawer()}
      overlayClassName="modal"
      className="modal__content"
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      bodyOpenClassName="util__body-lock"
    >
      <StyledDrawer open={drawerIsOpen}>
        <CloseButton
          onClick={() => closeDrawer()}
          title="Close Overlay"
          aria-label="Close Overlay"
        >
          &times;
        </CloseButton>
        {children}
      </StyledDrawer>
    </Modal>
    )
  );
}

Drawer.propTypes = {
  children: ReactChild,
  open: PropTypes.bool,
  close: PropTypes.func,
};

export default Drawer;
