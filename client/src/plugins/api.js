import axios from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL);
const API_KEY = (import.meta.env.VITE_API_KEY);

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    if(API_KEY && !config.headers['x-api-key']){
        config.headers['x-api-key'] = API_KEY
    }
    return config
}, (error) => Promise.reject(error))

const axios_plugin = {
    install(app) {
        app.config.globalProperties.$axios = api
        app.config.globalProperties.$api = api

        app.provide('axios', api)
        app.provide('api', api)
    },
}

export { api }
export default axios_plugin