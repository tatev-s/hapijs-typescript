import config from "../../config/index";

const { db, app } = config;

export interface IServerConfigurations {
  port: string | number;
  plugins: Array<string>;
  routePrefix: string;
}

export interface IDataConfiguration {
  connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
  return {
    connectionString: db.mongoUrl,
  };
}

export function getServerConfigs(): IServerConfigurations {
  return {
    port: app.port,
    routePrefix: app.routePrefix,
    plugins: app.plugins,
  };
}
