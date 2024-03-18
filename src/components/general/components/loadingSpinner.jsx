export default function LoadingSpinner({ dimension = 'h-10 w-10' }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`animate-spin rounded-full ${dimension} border-t-4 border-t-messageColor border-4 border-black`}></div>
    </div>
  );
}


