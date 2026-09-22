import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/react";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useUser();

  // Wait until Clerk finishes checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not signed in → go to home page
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // Signed in → allow access
  return <Outlet />;
};

export default ProtectedRoute;