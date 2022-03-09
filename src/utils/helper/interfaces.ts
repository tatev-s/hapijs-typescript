import * as Hapi from "@hapi/hapi";

export interface IRequest extends Hapi.Request {
  params: any;
  query: any;
  payload: any;
}
