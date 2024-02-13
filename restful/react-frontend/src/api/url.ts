const apiUrl: string =
    (import.meta as any).env.DEV ? "http://localhost:5006/api/v1" :
        "https://nereactjs-backend.onrender.com/api/v1";

export {
    apiUrl
};