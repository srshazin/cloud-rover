type HandlerType = {};

export interface Route {
  path: string;
  // Overloading handler for multiple call signatures
  handler(request: Request, env: any): Promise<Response>;
  handler(request: Request, params: RouteParams): Promise<Response>;
  handler(request: Request, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, env: any, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, params: RouteParams, env: any): Promise<Response>;
  handler(
    request: Request,
    params: RouteParams,
    ctx: ExecutionContext
  ): Promise<Response>;
  handler(
    request: Request,
    params: RouteParams,
    env: any,
    ctx: ExecutionContext
  ): Promise<Response>;
  method?: string;
}
export type RouteParams = {
  pathParams: any;
  queryParams: any;
};
