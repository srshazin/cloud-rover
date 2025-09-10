import { reply } from "./response";
import {
  cacheSchematicPaths,
  findDynamicRoute,
  getQueryParams,
  matchSchematicPath,
} from "./router";
import { Route, RouteParams } from "./types";
import { containsDynamicRoute, getCorsHeaders } from "./utils";

/**
 * The Rover middleware
 * @export
 * @param {Request} request
 * @param {Route[]} router
 * @param {Env} env
 * @param {ExecutionContext} ctx
 * @param {(string[]|string)} [allowedOrigins]
 * @return {*}  {Promise<Response>}
 */
let initialized = false;

export async function Rover(
  request: Request,
  router: Route[],
  env: Env,
  ctx: ExecutionContext,
  allowedOrigins?: string[] | string
): Promise<Response> {
  // create a schematic route cache on first call.
  function init() {
    cacheSchematicPaths(router);
    initialized = true;
  }
  if (!initialized) {
    init();
  }
  // requested path
  const requestedPath = new URL(request.url).pathname;
  // dynamic path parameter holder
  let pathParams: object | null = null;
  // check whether the absolute path exists in the router array
  let route = router.filter((route) => route.path == requestedPath)[0];

  // now we list all the dynamic routes here if static route is not found
  if (!route) {
    const dynamicRoutes = router.filter((t) => containsDynamicRoute(t.path));
    // now we match the route with available dynamic routes
    const matchedDynamicRoute = findDynamicRoute(requestedPath, dynamicRoutes);
    console.log("Found dynamic route ", matchedDynamicRoute);
    if (matchedDynamicRoute) {
      route = matchedDynamicRoute.route;
      pathParams = matchedDynamicRoute.pathParams;
    }
  }

  const params: RouteParams = {
    pathParams: pathParams,
    queryParams: getQueryParams(request.url),
  };

  /**
   * Final type: Schematic Path
   * Filter out schematic Path
   */
  // check if route is still null
  if (!route) {
    const matchedSchematicPath = matchSchematicPath(requestedPath);
  }
  // get the cors headers
  const corsHeader = getCorsHeaders(
    request.headers.get("Origin"),
    allowedOrigins
  );
  if (route) {
    // check if method is defined in the router
    if (route.method) {
      // check if it's a pre-flight OPTIONS request. if so allow all origins and send proper headers so browser can recognize
      if (request.method.toUpperCase() == "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeader,
        });
      }

      if (request.method.toLowerCase() != route.method.toLowerCase()) {
        return reply.error("Method not allowed.", 405, corsHeader);
      }
    } else {
      // in that case by default only GET method is allowed
      if (request.method != "GET") {
        return reply.error("Method not allowed.", 405, corsHeader);
      }
    }

    // requested path is matched with at least one from the router
    const response = await route.handler({
      request: request,
      params: params,
      env: env,
      ctx: ctx,
    });
    for (const [key, value] of corsHeader.entries()) {
      if (!response.headers.has(key)) {
        response.headers.set(key, value);
      }
    }
    return response;
  } else {
    // check if a custom route for 404 is defined.
    const custom404Route = router.filter(
      (r) => r.path == "*" || r.path == "/*"
    )[0];
    if (custom404Route) {
      const response = await custom404Route.handler({
        request: request,
        params: params,
        env: env,
        ctx: ctx,
      });
      for (const [key, value] of corsHeader.entries()) {
        if (!response.headers.has(key)) {
          response.headers.set(key, value);
        }
      }
      return response;
    }
    return reply.error("404 Not Found", 404);
  }
}
