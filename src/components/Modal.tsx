import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

function Modal({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <ModalContext.Provider value={{ setShowModal }}>
      {showModal && (
        <div className="w-full absolute flex justify-center mt-12">
          <div className="w-80 h-80 bg-gray-200 absolute z-10  ">
            it is Modal
            <button onClick={() => setShowModal(false)}>close modal</button>
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
}

export default Modal;

export const useModal = () => useContext(ModalContext);
