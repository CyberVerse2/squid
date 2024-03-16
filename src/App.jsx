import { Home } from './pages/home.jsx';
import './App.css';
import Index from './pages/index.jsx';
import { Authenticated, useConvexAuth } from 'convex/react';
import LoadingSpinner from './components/general/components/loadingSpinner.jsx';
import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const createUser = useMutation(api.user.createUser)
  const createIssue = useAction(api.issues.getAllIssues)
  createIssue({githubUsername:'CyberVerse2', installationId: 48504203}).then(issue => console.log(issue))
  // console.log(newIssue)

  useEffect(() => {
    if (isAuthenticated) {
      createUser();
    }
  }, [createUser, isAuthenticated]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner /> // Render the loading spinner if resources are still loading
      ) : isAuthenticated ? (
        <Home />
      ) : (
        <Index />
      )}
    </>
  );
}

export default App;
