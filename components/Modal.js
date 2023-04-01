// components/Modal.js
import React from 'react';
import { Transition } from 'react-transition-group';

const Modal = ({ isOpen, onClose, children }) => {
  const duration = 200;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <>
      <Transition in={isOpen} timeout={duration} unmountOnExit>
        {(state) => (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="relative bg-white shadow-lg rounded-lg">
              <button
                className="absolute top-0 right-0 p-2 text-xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={onClose}
              >
                &times;
              </button>
              <div className="p-6">{children}</div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

export default Modal;
