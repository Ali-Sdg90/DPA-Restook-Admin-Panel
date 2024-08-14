import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";
import { LOCAL_STORAGE_TOKEN } from "../constants/commonConstants";

const getLocalToken = () => {
    try {
        const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
        return token ? JSON.parse(token) : null;
    } catch (error) {
        console.error("Failed to retrieve token from local storage:", error);
        return null;
    }
};

const handleError = (error) => {
    if (error.response) {
        console.error("Error response:", error.response.data);
    } else if (error.request) {
        console.error("Error request:", error.request);
    } else {
        console.error("Error message:", error.message);
    }
    return Promise.reject(error);
};

const createHeaders = (needToken) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (needToken) {
        const localToken = getLocalToken();
        if (localToken) {
            headers["Authorization"] = `Bearer ${localToken}`;
        }
    }

    return headers;
};

// POST REQUEST
export const postRequest = async (endpoint, data, needToken = true) => {
    // console.log("ENDPOINT: ", endpoint);

    try {
        const res = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
            headers: createHeaders(needToken),
        });

        return res.data;
    } catch (error) {
        return handleError(error);
    }
};

// GET REQUEST
export const getRequest = async (endpoint, needToken = true) => {
    // console.log("ENDPOINT: ", endpoint);

    try {
        const res = await axios.get(`${API_BASE_URL}${endpoint}`, {
            headers: createHeaders(needToken),
        });

        return res.data;
    } catch (error) {
        return handleError(error);
    }
};
