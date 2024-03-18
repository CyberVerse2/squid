import { useConvexAuth, useQuery } from 'convex/react';
import { ChatItem } from './chatItem';
import { api } from '../../../convex/_generated/api';
import LoadingSpinner from '../general/components/loadingSpinner';

export function ChatList() {
  let issues = useQuery(api.issues.getIssues);
  const { isAuthenticated } = useConvexAuth();
  return (
    <div className="lg:w-[30%] w-full  overflow-y-auto px-4 pt-4 pb-0 border-r border-r-gray-200">
      {isAuthenticated ? (
        issues ? (
          issues?.map((issue) => <ChatItem key={issue.number} issue={issue} />)
        ) : (
          <LoadingSpinner dimension="h-7 w-7" />
        )
      ) : (
        []
      )}
    </div>
  );
}
