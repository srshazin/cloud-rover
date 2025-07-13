export type Env = {
  DB: D1Database;
};

export type Route = {
  path: string;
  handler(request: Request, params: RouteParams): Promise<Response>;
  handler(request: Request, params: RouteParams, env: Env): Promise<Response>;
  handler(request: Request, env: Env): Promise<Response>;
  handler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, ctx: ExecutionContext): Promise<Response>;
  handler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  handler(
    request: Request,
    params: RouteParams,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response>;
  method?: string;
};
export type RouteParams = {
  pathParams: any;
  queryParams: any;
};
