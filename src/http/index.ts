import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mantém export default para facilitar importações como `import http from "@/http"`
export default httpClient;

// Exemplo de uso no front-end:
// import { httpClient } from "@/http";
// const { data } = await httpClient.get("/terms/en");

