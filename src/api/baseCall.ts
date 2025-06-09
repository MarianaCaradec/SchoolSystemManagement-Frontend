import axios from "axios";

const backendBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5204";
console.log("Base API URL:", backendBaseURL);

const api = axios.create({
    baseURL: backendBaseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

export default api;