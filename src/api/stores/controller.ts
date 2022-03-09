import * as Hapi from "@hapi/hapi";
import * as _ from "lodash";

import StoreService from "./service";
import newResponse from "../../utils/helper/response";
import Boom from "@hapi/boom";

import { IRequest } from "../../utils/helper/interfaces";
import { IStore } from "../../models/Store";
import { cacheStores } from "../../server";

export default class StoreController {
  public async create(request: IRequest, toolkit: Hapi.ResponseToolkit) {
    try {
      const payload: IStore = <IStore>request.payload;
      const store: IStore = await StoreService.create(payload);

      return toolkit.response(
        newResponse(request, {
          value: store,
        })
      );
    } catch (e: any) {
      return toolkit.response(
        newResponse(request, {
          boom: Boom.badImplementation(e),
        })
      );
    }
  }

  public async getById(request: IRequest, toolkit: Hapi.ResponseToolkit) {
    try {
      const id = request.params;
      const store = await cacheStores.get(id);
      return toolkit.response(
        newResponse(request, {
          value: store,
        })
      );
    } catch (e: any) {
      return toolkit.response(
        newResponse(request, {
          boom: Boom.badImplementation(e),
        })
      );
    }
  }
}
