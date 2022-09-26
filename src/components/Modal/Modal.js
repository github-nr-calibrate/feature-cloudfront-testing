import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal'; // Use alias instead of `Modal` for clarity
import PropTypes, { ReactChild } from 'types';

ReactModal.setAppElement('#__next');

// `react-modal`-friendly styles
const reactModalStyles = {
  overlay: {
    padding: '4rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '50rem',
  },
};

const CloseButton = styled.button`
  font-size: 1.875rem;
  position: absolute;
  top: 1.25rem;
  right: 2.5rem;
  color: white;
  transition: background 0.3s ease;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color__lavenderLight);
  border-radius: 100%;
  padding: 0 0 5px 0;
  background: var(--color__nightshade);

  &:hover {
    background: var(--color__lavenderLight);
  }
`;

function Modal({
  children, open, close, resetStyles,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    open ? openModal() : null;
  }, [open]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    close();
    setIsModalOpen(false);
  };

  return (
    isModalOpen && (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      overlayClassName="modal"
      className="modal__content"
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      bodyOpenClassName="util__body-lock"
      style={resetStyles ? {} : reactModalStyles}
    >
      {children}
      <CloseButton
        onClick={() => closeModal()}
        aria-label="Close overlay"
      >
        &times;
      </CloseButton>
    </ReactModal>
    )
  );
}

Modal.propTypes = {
  children: ReactChild,
  open: PropTypes.bool,
  close: PropTypes.func,
  resetStyles: PropTypes.bool,
};

export default Modal;
