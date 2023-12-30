const apiUrl: string = import.meta.env.DEV
    ? "http://localhost:5000/api/v1"
    : "https://restful-ne-backend.onrender.com/api/v1";

export {
    apiUrl
};