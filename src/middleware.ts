import { reply } from "./response";
import { findDynamicRoute, getQueryParams } from "./router";
import { Route, RouteParams } from "./types";
import { containsDynamicRoute } from "./utils";

export async function Rover(
  request: Request,
  router: Route[]
): Promise<Response> {
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

  if (route) {
    // check if method is defined in the router
    if (route.method) {
      // check if it's a pre-flight OPTIONS request. if so allow all origins and send proper headers so browser can recognize
      if (request.method.toUpperCase() == "OPTIONS") {
        const corsHeader = new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        });
        return reply.text("", 204, corsHeader);
      }

      if (request.method.toLowerCase() != route.method.toLocaleLowerCase()) {
        return reply.error("Method not allowed.", 405);
      }
    } else {
      // in that case by default only GET method is allowed
      if (request.method != "GET") {
        return reply.error("Method not allowed.", 405);
      }
    }

    // requested path is matched with at least one from the router

    return route.handler(request, params);
  } else {
    // check if a custom route for 404 is defined.
    const custom404Route = router.filter(
      (r) => r.path == "*" || r.path == "/*"
    )[0];
    if (custom404Route) {
      return custom404Route.handler(request, params);
    }
    return reply.error("404 Not Found", 404);
  }
}
