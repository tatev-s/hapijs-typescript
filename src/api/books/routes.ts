import BookController from "./controller";
import validate from "./validate";

import { ServerRoute } from "@hapi/hapi";

const bookController: BookController = new BookController();

export function bookRoutes(): Array<ServerRoute> {
  let routes: Array<ServerRoute> = [
    {
      method: "GET",
      path: "/book/{id}/get",
      handler: bookController.getById,
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/book/create",
      handler: bookController.create,
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
