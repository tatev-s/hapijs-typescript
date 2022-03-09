export const NODE_ENV = process.env.NODE_ENV || "dev";

const dev = {
  environment: "development",
  app: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || "5002",
    routePrefix: "/v1",
    plugins: ["logger"],
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    name: process.env.DB_NAME || "db",
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/development",
  },
};

export default dev;
