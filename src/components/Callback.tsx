// components/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
    const { handleRedirectCallback } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            await handleRedirectCallback();
            navigate('/dashboard');
        };
        handleCallback();
    }, [handleRedirectCallback, navigate]);

    return <div>Processing authentication...</div>;
};

export default Callback;