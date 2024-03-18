import { Home } from './pages/Home.jsx';
import './App.css';
import Index from './pages/index.jsx';
import { useConvexAuth } from 'convex/react';
import LoadingSpinner from './components/general/components/loadingSpinner.jsx';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useEffect } from 'react';
import ShowChatProvider from './components/providers/ShowChatProvider.jsx';
import IssueProvider from './components/providers/IssueProvider.jsx';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isAuthenticated) createUser();
  }, [isAuthenticated]);

  return (
    <IssueProvider>
      <ShowChatProvider>
        {isLoading ? (
          <LoadingSpinner /> // Render the loading spinner if resources are still loading
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
