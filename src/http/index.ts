import axios from "axios";

/**
 * Resolve a baseURL que evita CORS em produção usando o proxy do Next (/api)
 * e mantém o localhost durante o desenvolvimento.
 */
const resolvedBaseURL =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : "http://localhost:3000";

export const httpClient = axios.create({
    baseURL: resolvedBaseURL,
    timeout: 10000,
});

// Mantém export default para facilitar importações como `import http from "@/http"`
export default httpClient;

// Exemplo de uso no front-end:
// import { httpClient } from "@/http";
// const { data } = await httpClient.get("/terms/en");
