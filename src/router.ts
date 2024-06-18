import { Server, ServerRoute } from "@hapi/hapi";

import * as Book from "./api/books/routes";
import * as Store from "./api/stores/routes";

// Create routes array for register routes on server
export function RegisterRoutes(server: Server): void {
  const routes: ServerRoute[] = [
    ...Book.bookRoutes(),
    ...Store.storeRoutes(),
  ];
  server.route(routes);
}
