import axios from 'axios';
import { serverUrl } from './constant';
import { useNavigate } from 'react-router-dom';

const fetchClient = () => {
    const defaultOptions = {
    baseURL: serverUrl,
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
    };

    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
    const IdToken = localStorage.getItem('IdToken');
    config.headers.Authorization =  IdToken ? `Bearer ${IdToken}` : '';
    return config;
    });

    return instance;
};

export const handleErrorsNoRedirect = (error: any) => {
    if (error.response) {
        // Request made and server responded
        // User is not authenticated
        if (error.response.status == 401 && localStorage.getItem('IdToken') != null) {
            localStorage.removeItem('IdToken');
            document.location.reload();
        }
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}
export const handleErrors = (error: any) => {
    if (error.response) {
        // Request made and server responded
        // User is not authorized
        const navigate = useNavigate();
        if (error.response.status == 403) {
            navigate('/unauthorized');
        }
        // User is not authenticated
        if (error.response.status == 401 && localStorage.getItem('IdToken') != null) {
            localStorage.removeItem('IdToken');
            navigate('/login');
        }
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export default fetchClient();
