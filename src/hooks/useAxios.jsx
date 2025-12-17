import axios from "axios";

const axiosIn = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxios = () => {
    return axiosIn;
}

export default useAxios;