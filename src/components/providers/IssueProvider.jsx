import { createContext, useContext, useState } from 'react';

const IssueContext = createContext(null);
export const useCurrentIssue = () => useContext(IssueContext);
function IssueProvider({ children }) {
  const [currentIssue, setCurrentIssue] = useState(null);
  return (
    <IssueContext.Provider value={{ currentIssue, setCurrentIssue }}>
      {children}
    </IssueContext.Provider>
  );
}

export default IssueProvider;
