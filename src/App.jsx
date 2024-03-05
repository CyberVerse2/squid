import { useState } from 'react';
import { Home } from './pages/home.jsx';
import './App.css';
import Index from './pages/index.jsx';
import { SignInButton } from '@clerk/clerk-react';
const isAuthenticated = true;
function App() {
  return (
    <>
      <SignInButton mode="modal" />
      <h1>shege</h1>
      <Home/>
    </>
  );
}

export default App;
