// src/pages/NotFound.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/notfound.css'; // optional — we'll create it

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  // Auto-redirect after 3 seconds (optional — remove if you prefer manual)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="notfound-home-link">
        Go back to Home
      </Link>
      <p className="notfound-auto-redirect">You'll be redirected automatically in a few seconds...</p>
    </div>
  );
};

export default NotFound;