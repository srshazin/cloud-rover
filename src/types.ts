export interface RouterContext {
  request: Request;
  params: RouteParams;
  env: unknown;
  ctx: ExecutionContext;
}

export interface Route {
  path: string;
  handler(rc: RouterContext): Promise<Response>;
  method?: string;
}
export type RouteParams = {
  pathParams: any;
  queryParams: any;
};
