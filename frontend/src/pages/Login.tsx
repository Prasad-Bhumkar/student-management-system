import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import EnhancedUI from '../components/ui/EnhancedUI';
import { useAuth } from '../contexts/AuthContext';

type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean; // Ensure this is always a boolean
};
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false, // Ensure this is always a boolean
  });
  const [error, setError] = useState<string | null>(null);
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      if (!navigator.onLine) {
        setError('Network error: Please check your internet connection.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <EnhancedUI
      onSubmit={handleSubmit}
      error={error}
      credentials={credentials}
      handleChange={handleChange}
    />
  );
};

export default Login;
