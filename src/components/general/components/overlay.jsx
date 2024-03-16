import { createPortal } from 'react-dom';

const Overlay = ({ closeModal, children }) => {
  return createPortal(
    <div
      className="absolute top-0 left-0 w-full h-full bg-transparent  flex items-center justify-center"
      onClick={closeModal}
    >
      {children}
    </div>,
    document.getElementById('portal')
  );
};

export default Overlay;
