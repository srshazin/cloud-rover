import { reply } from "./response";
import {
  getQueryParams,
  matchDynamicRoute,
  matchSchematicRoute,
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

export async function Rover(
  request: Request,
  router: Route[],
  env: Env,
  ctx: ExecutionContext,
  allowedOrigins?: string[] | string
): Promise<Response> {
  // requested path
  const requestedPath = new URL(request.url).pathname;

  // dynamic path parameter holder
  let pathParams: object | null = null;

  // schematic route's subpath holder
  let subPath: string | undefined = undefined;

  // check whether the absolute path exists in the router array
  let route = router.filter((route) => route.path == requestedPath)[0];

  // now we list all the dynamic routes here if static route is not found
  if (!route) {
    const dynamicRoutes = router.filter((t) => containsDynamicRoute(t.path));
    // now we match the route with available dynamic routes
    const matchedDynamicRoute = matchDynamicRoute(requestedPath, dynamicRoutes);
    if (matchedDynamicRoute) {
      route = matchedDynamicRoute.route;
      pathParams = matchedDynamicRoute.pathParams;
    }
  }

  // if route is still null find match for a schematic path
  if (!route) {
    const schematicRoutes = router.filter((t) => t.isSchematic);

    if (schematicRoutes.length > 0) {
      const matchedSchematicRoute = matchSchematicRoute(
        requestedPath,
        schematicRoutes
      );
      if (matchedSchematicRoute) {
        route = matchedSchematicRoute.route;
        subPath = matchedSchematicRoute.subPath;
      }
    }
  }

  const params: RouteParams = {
    pathParams: pathParams,
    queryParams: getQueryParams(request.url),
  };

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
        console.log(corsHeader);

        return new Response(null, {
          status: 204,
          headers: corsHeader,
        });
      }
      // check if the method is not an * since routes defined as "*" will allow any method
      if (route.method != "*") {
        if (request.method.toLowerCase() != route.method.toLowerCase()) {
          return reply.error("Method not allowed.", 405, corsHeader);
        }
      }
    } else {
      // method is not defined.
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
      subPath: subPath,
    });
    for (const [key, value] of corsHeader.entries()) {
      if (!response.headers.has(key)) {
        response.headers.set(key, value);
      }
    }

    return response;
  } else {
    // requested didn't match with any defined route
    // check if a custom route for 404 is defined.
    const custom404Route = router.filter(
      (r) => r.path == "*" || r.path == "/*"
    )[0];

    if (custom404Route) {
      const response = await custom404Route.handler({
        request: request,
        params: params,
        subPath: subPath,
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
