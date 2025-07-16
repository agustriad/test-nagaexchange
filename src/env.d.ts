/* eslint-disable prettier/prettier */
declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL_CORE: string;
        NODE_ENV: string;
        PORT: string;
        HOST: string;
        DATABASE_ENGINE: string;
        DATABASE_NAME: string;
        DATABASE_HOST: string;
        DATABASE_PORT: string;
        DATABASE_USER: string;
        DATABASE_PASSWORD: string;
        JWT_SECRET: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
    }
}
