
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// This file redirects to Home.tsx so we have proper route organization
export default function Index() {
  useEffect(() => {
    // Log when the index page is loaded
    console.log('Index page loaded, redirecting to home');
  }, []);

  return <Navigate to="/" replace />;
}
