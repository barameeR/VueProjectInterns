/// <reference types="vite/client" />

// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        EC2_BASE_URL: string;
    }
}
