import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosIn = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosIn.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useAxios = () => {
    return axiosIn;
};

export default useAxios;