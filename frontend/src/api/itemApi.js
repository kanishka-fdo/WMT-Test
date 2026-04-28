import axios from "axios";

// TODO (Task 04): Replace this with your deployed backend URL before deploying frontend
// Example: const BASE_URL = "https://your-backend.onrender.com/api";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = () => api.get("/items");
export const getItemById = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post("/items", data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);
