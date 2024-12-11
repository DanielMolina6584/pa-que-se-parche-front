import axios from "axios";

const verificarTokenRol = async (data = {}) => {
    try {
        const BASE_URL = process.env.REACT_APP_API_URL;
        const USERNAME = process.env.REACT_APP_USERNAME_API;
        const PASSWORD = process.env.REACT_APP_PASSWORD_API;
        const method = "POST";

        const config = {
            method,
            url: `${BASE_URL}${"autenticacion/verificar"}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`
            },
            data: method !== 'GET' ? data : undefined
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default verificarTokenRol;