import axios from "axios";

const newInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default newInstance;
