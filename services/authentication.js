const BASE_URL = 'http://localhost:3000/api';
const AUTH_KEY = '@authData';

const login = async (email, password) => {
    console.log('autenticando contra la BD...');
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            error: data.message || data.error || 'Credenciales incorrectas',
            status: response.status,
        };
    }

    return data; // { message, token, user }
};

const register = async (name, email, password) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw {
            error: data.message || data.error || 'Error al registrar usuario',
            status: response.status,
        };
    }

    return data;
};

export { login, register, AUTH_KEY };
