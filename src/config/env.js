import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT || "8080",
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/class-zero",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_FROM: process.env.MAIL_FROM || "no-reply@classzero.local"
};
