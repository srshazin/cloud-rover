export type Route = {
    path: string,
    handler(request: Request): Promise<Response>,
    method?: string
}