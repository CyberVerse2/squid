import './App.css';
import Index from './pages/B.jsx';
import Home from './pages/A.jsx'
import { useConvexAuth } from 'convex/react';
import LoadingSpinner from './components/general/components/loadingSpinner.jsx';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useEffect } from 'react';
import ShowChatProvider from './components/providers/ShowChatProvider.jsx';
import IssueProvider from './components/providers/IssueProvider.jsx';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isAuthenticated) createUser();
  }, [createUser, isAuthenticated]);

  return (
    <IssueProvider>
      <ShowChatProvider>
        {isLoading ? (
          <LoadingSpinner />
        ) : isAuthenticated ? (
          <Home />
        ) : (
          <Index />
        )}
      </ShowChatProvider>
    </IssueProvider>
  );
}

export default App;
