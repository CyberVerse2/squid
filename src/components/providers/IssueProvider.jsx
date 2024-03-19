import { createContext, useContext, useState } from 'react';

const IssueContext = createContext(null);
export const useCurrentIssue = () => useContext(IssueContext);
function IssueProvider({ children }) {
  const [currentIssue, setCurrentIssue] = useState(null);

  const handleSetIssue = (_val) => {
    setCurrentIssue(_val);
  };

  return (
    <IssueContext.Provider value={{ currentIssue, setCurrentIssue: handleSetIssue }}>
      {children}
    </IssueContext.Provider>
  );
}

export default IssueProvider;
