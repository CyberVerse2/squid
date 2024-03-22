import { createPortal } from 'react-dom';

const Overlay = ({ closeModal, children }) => {
  return createPortal(
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center  filter"
      onClick={closeModal}
    >
      {children}
    </div>,
    document.getElementById('portal')
  );
};

export default Overlay;
