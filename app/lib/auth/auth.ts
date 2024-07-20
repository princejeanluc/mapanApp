// utils/auth.ts
// utils/auth.ts
import {deleteCookie, setCookie, getCookie } from 'cookies-next';
import Swal from 'sweetalert2';

const API_URL = 'http://192.168.1.105:8000'; // Remplacez par l'URL de votre API

interface AuthResponse {
    key: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${API_URL}/dj-rest-auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Erreur de connexion');
        }
        const data: AuthResponse = await response.json();
        setCookie('token', data.key);
        setCookie('username',username)
        Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            showConfirmButton: false,
            timer: 1500,
        });
        return data;
    } catch (error:any) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion',
            text: error.message || 'Une erreur s\'est produite',
        });
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await fetch(`${API_URL}/dj-rest-auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        deleteCookie('token');
        Swal.fire({
            icon: 'success',
            title: 'Déconnexion réussie',
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur de déconnexion',
            text: 'Une erreur s\'est produite',
        });
        throw error;
    }
};

// getUser reste inchangée

export const getUser = async (): Promise<any | null> => {
    const token = getCookie('token');
    console.log("token="+token)
    if (!token) {
        return null;
    }

    try {
        const username = getCookie('username')
        const response = await fetch(`${API_URL}/dj-rest-auth/user/`, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Erreur de connexion');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
        return null;
    }
};
