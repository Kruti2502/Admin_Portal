import dotenv from "dotenv";

dotenv.config();

const config = {
  HOST: process.env.HOST || "localhost",
  PORT: +process.env.PORT! || 5001,
  MONGO_URL: process.env.MONGO_URL,
};

export default config;
