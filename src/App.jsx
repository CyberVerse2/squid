import { Home } from './pages/home.jsx';
import './App.css';
import Index from './pages/index.jsx';
import { useConvexAuth } from 'convex/react';
import LoadingSpinner from './components/general/components/loadingSpinner.jsx';
import Modal from './components/general/components/modal.jsx';
import { useState } from 'react';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      {isOpen && <Modal closeModal={closeModal} />}
      {isAuthenticated ? <Home openModal={openModal}/> : isLoading ? <LoadingSpinner /> : <Index />}
    </>
  );
}

export default App;
