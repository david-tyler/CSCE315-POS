import { useEffect, useState, createContext, useCallback, FC, PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './config/axiosConfig';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

axios.defaults.withCredentials = true;

type AuthContextType = {
    role: string;
    user: string;
    checkLoginState: () => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({ role: "", user: "", checkLoginState: async () => { }, signOut: async () => { } });

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const IdToken = localStorage.getItem('IdToken');

    const checkLoginState = useCallback(async () => {
        try {
            const { data: { role, user} } = await axios.get('/auth/login', { headers: { Authorization: 'Bearer ${IdToken}' } });
            role && setRole(role);
            user && setUser(user);
            axios.defaults.headers.common['Authorization'] = 'Bearer ${IdToken}'
        } catch (err) {
            setRole('');
            setUser('');
            localStorage.removeItem('IdToken');

            console.log('inhere');
            console.error(err);
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            setRole('');
            setUser('');
            localStorage.removeItem('IdToken');
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider value={{ role, user, checkLoginState, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const LoginButton = () => {
    const navigate = useNavigate();
    const { role, checkLoginState } = useContext(AuthContext);
    const login = async (response: CredentialResponse) => {
        const IdToken = response.credential ?? '';
        localStorage.setItem('IdToken', IdToken);
        await checkLoginState();
        console.log(role);

        if (role === "ROLE_manager") {
            navigate('/manager');
            document.location.reload();
            return;
        } else if (role === "ROLE_server") {
            navigate('/server');
            document.location.reload();
            return;
        }
        navigate('/');
        document.location.reload();
    }
    const errorMessage = () => {
        console.error('Error logging in');
    }
    return (
        <GoogleLogin onSuccess={login} onError={errorMessage} />
    );
}
