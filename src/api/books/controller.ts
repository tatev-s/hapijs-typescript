import * as Hapi from "@hapi/hapi";
import * as _ from "lodash";

import newResponse from "../../utils/helper/response";
import Boom from "@hapi/boom";
import BookService from "./service";

import { ObjectId } from "mongoose";
import { IBook } from "../../models/Book";
import { IRequest } from "../../utils/helper/interfaces";
import { validateStoreIds } from "./validate";
import { cacheBooKs } from "../../server";

export default class BookController {
  public async create(request: IRequest, toolkit: Hapi.ResponseToolkit) {
    try {
      const payload: IBook = <IBook>request.payload;
      const storeIds: Array<ObjectId> = await validateStoreIds(payload.stores);
      if (!storeIds.length) {
        throw new Error("Store ids are not valid");
      }
      const payloadData: IBook = { ...payload, stores: storeIds };
      const book: IBook = await BookService.create(payloadData);
      return toolkit.response(
        newResponse(request, {
          value: {
            book,
          },
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
      const id: string = request.params;
      const book = await cacheBooKs.get(id);
      return toolkit.response(
        newResponse(request, {
          value: book,
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
