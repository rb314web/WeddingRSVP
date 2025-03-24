import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && error) {
            navigate('/error');
        }
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, error, navigate]);

    if (isLoading) return <div>Ładowanie...</div>;

    return <>{children}</>;
};

export default AuthGuard;