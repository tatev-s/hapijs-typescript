import * as Hapi from "@hapi/hapi";
import * as Api from "./router";
import * as Database from "./config/database";
import * as Configs from "./utils/settings";
import * as _ from "lodash";

import Joi from "joi";
import StoreService from "./api/stores/service";
import CatboxRedis from "@hapi/catbox-redis";
import BookService from "./api/books/service";

import { BookDocName } from "./models/Book";
import { StoreDocName } from "./models/Store";
import { IPlugin } from "./utils/plugins/interfaces";

// Starting Application Server
const configs = Configs.getServerConfigs();
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

// Create hapi server instance
export const server = new Hapi.Server({
  debug: { request: ["error"] },
  port: process.env.PORT || configs.port,
  routes: {
    cors: {
      origin: ["*"],
    },
  },
  cache: [
    {
      name: "redis",
      provider: {
        constructor: CatboxRedis,
        options: {
          port: 6379,
          host: "localhost",
        },
      },
    },
  ],
});

// Set Joi as a server validator
server.validator(Joi);

if (configs.routePrefix) {
  server.realm.modifiers.route.prefix = configs.routePrefix;
}

export const setupPlugins = async () => {
  const plugins: string[] = configs.plugins;
  const pluginOptions = {
    database,
    serverConfigs: configs,
  };
  // List of all plugins
  const pluginPromises: Promise<any>[] = plugins.map((pluginName: string) => {
    const plugin: IPlugin = require("./utils/plugins/" + pluginName).default();
    console.info(
      `Register Plugin ${plugin.info().name} v${plugin.info().version}`
    );
    return plugin.register(server, pluginOptions);
  });
  await Promise.all(pluginPromises);
  console.info("All plugins registered successfully.");

  // register all routes
  Api.RegisterRoutes(server);
};


// cache books
export const cacheBooKs = server.cache({
  expiresIn: 60 * 60 * 24 * 1000,
  segment: BookDocName,
  generateFunc: async (data) => {
    const str = JSON.stringify(data);
    const newObj = JSON.parse(str);
    const { id } = newObj;
    const book = await BookService.getById(id);
    return _.get(book, "[0]", []);
  },
  generateTimeout: 2000,
});

// cache stores
export const cacheStores = server.cache({
  expiresIn: 60 * 60 * 24 * 1000,
  segment: StoreDocName,
  generateFunc: async (data) => {
    const str = JSON.stringify(data);
    const newObj = JSON.parse(str);
    const { id } = newObj;
    const store = await StoreService.getById(id);
    return _.get(store, "[0]", []);
  },
  generateTimeout: 2000,
});
