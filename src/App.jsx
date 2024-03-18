import { Home } from './pages/Home';
import './App.css';
import Index from './pages/index.jsx';
import { useConvexAuth } from 'convex/react';
import LoadingSpinner from './components/general/components/loadingSpinner.jsx';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useEffect } from 'react';
import ShowChatProvider from './components/providers/ShowChatProvider.jsx';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const createUser = useMutation(api.user.createUser);
  const getIssues = useAction(api.github.getIssues);

  useEffect(() => {
    getIssues({ githubUsername: 'CyberVerse2', installationId: 48504203, state: 'all' }).then(
      (issue) => console.log(issue)
    );
  }, [getIssues]);
  
  useEffect(() => {
    if (isAuthenticated) {
      createUser();
    }
  }, [createUser, isAuthenticated]);

  return (
    <ShowChatProvider>
        {isLoading ? (
          <LoadingSpinner /> // Render the loading spinner if resources are still loading
        ) : isAuthenticated ? (
          <Home />
        ) : (
          <Index />
        )}
    </ShowChatProvider>
  );
}

export default App;
