// src/components/Modal.js
import React, { useCallback, useEffect } from "react";

const Modal = ({ isOpen, onClose, children, title }) => {
  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape, false);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-auto max-w-3xl mx-auto my-6 z-50">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative flex-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
