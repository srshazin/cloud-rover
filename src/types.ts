/**
 * RC or RouteContext is an interface that defines all the necessary request properties needed for a handler.
 *
 * @export
 * @interface RC
 */
export interface RC {
  request: Request;
  params: RouteParams;
  env: unknown;
  ctx: ExecutionContext;
}

/**
 * Type definition for Route
 *
 * @export
 * @interface Route
 */
export interface Route {
  path: string;
  handler(rc: RC): Promise<Response>;
  method?:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "CONNECT";
  isSchematic?: boolean;
}

export type RouteParams = {
  pathParams: any;
  queryParams: any;
};
