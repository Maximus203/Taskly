// context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [currentUser, setCurrentUser] = useState(initialToken ? { email: "unknown" } : null);
    const [token, setToken] = useState(null); // Pour stocker le token
    const [errors, setErrors] = useState({}); // Stocke les erreurs possibles

    const login = async (email, mot_de_passe) => {
        try {
            const data = { email, mot_de_passe };
            const response = await api.post('users/login', data);
            if (response.data.success) {
                const { message, data: { token: receivedToken } } = response.data;

                setCurrentUser({ email });
                setToken(receivedToken);
                localStorage.setItem('token', receivedToken);

                setErrors({});

                return { success: true, message };
            } else {
                setErrors(response.data.errors || {});
                return { success: false, message: response.data.message || "Erreur lors de la connexion." };
            }
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
            setErrors({ global: "Une erreur s'est produite lors de la connexion. Veuillez réessayer." });
            return { success: false, message: "AuthContext: Une erreur s'est produite lors de la connexion." };
        }
    };
    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('token');
    };


    return (
        <AuthContext.Provider value={{ currentUser, login, logout, errors }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
