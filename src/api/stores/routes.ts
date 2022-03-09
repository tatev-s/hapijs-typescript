import StoreController from "./controller";
import validate from "./validate";

import { ServerRoute } from "@hapi/hapi";

const storeController: StoreController = new StoreController();

export function storeRoutes(): Array<ServerRoute> {
  let routes: Array<ServerRoute> = [
    {
      method: "GET",
      path: "/store/{id}/get",
      handler: storeController.getById,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/store/create",
      handler: storeController.create,
      options: {
        auth: false,
        validate: {
          ...validate.create,
          failAction: async (request, reply, err: any) => {
            throw err;
          },
        },
      },
    },
  ];
  return routes;
}
