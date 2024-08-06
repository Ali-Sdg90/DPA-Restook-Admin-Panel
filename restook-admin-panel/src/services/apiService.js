import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

export const login = async (formData) => {
    try {
        const res = await axios.post(API_BASE_URL, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
        } else if (error.request) {
            console.error("Error request:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        throw error;
    }
};
