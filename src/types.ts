export type Route = {
    path: string,
    handler(request: Request, params: RouteParams): Promise<Response>,
    method?: string
}
export type RouteParams = {
    pathParams: any,
    queryParams: any
}