const BASE_URL = 'http://localhost:3000/api';
const AUTH_KEY = '@authData';

const login = async (email, password) => {
    console.log('autenticando...');
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const shouldAuthenticate = response.ok;
    if (shouldAuthenticate) {
        return response.json();
    } else {
        return Promise.reject({
            error: 'Credenciales incorrectas',
            status: 401,
        });
    }
};

export { login, AUTH_KEY };
