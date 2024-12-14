import axios from 'axios';

const requestApi = async (route, method = 'POST', data = {}) => {
    try {
        const BASE_URL = process.env.REACT_APP_API_URL;
        const USERNAME = process.env.REACT_APP_USERNAME_API;
        const PASSWORD = process.env.REACT_APP_PASSWORD_API;

        const config = {
            method,
            url: `${BASE_URL}${route}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`
            },
            data: method !== 'GET' ? data : undefined
        };

        const response = await axios(config);
        return response.data ?? [];
    } catch (error) {
        console.error('API Request Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default requestApi;

export const isMobileOrTablet = () => {
    const checkMobile = () => {
        const mobileWidth = 992;
        const hasTouchScreen = 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;

        return (
            window.innerWidth < mobileWidth ||
            hasTouchScreen ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    };

    return checkMobile();
};