import { Route, SchematicRoute } from "./types";
import { extractSubRoute } from "./utils";

/**
 * Returns an array of route objects which can be passed directly to the middleware for routing
 * @export
 * @param {Route[]} routes
 * @return {*}  {Route[]}
 */
export function createRouter(routes: Route[]): Route[] {
  return routes;
}

/**
 *
 *
 * @interface DynamicRouteData
 */
interface DynamicRouteData {
  route: Route;
  pathParams: object;
}

/**
 * Checks if the requested route can be parsed as a dynamic route
 * @export
 * @param {string} requestedPath
 * @param {Route[]} dynamicRoutes
 * @return {*}  {(DynamicRouteData | null)}
 */
export function matchDynamicRoute(
  requestedPath: string,
  dynamicRoutes: Route[]
): DynamicRouteData | null {
  for (const dynamicRoute of dynamicRoutes) {
    // Convert dynamic route to a regex pattern and capture dynamic values
    const regexPattern = dynamicRoute.path
      .replace(/{[^}]+}/g, "([^/]+)") // Replace placeholders with a regex to match path segments
      .replace(/\//g, "\\/"); // Escape slashes

    const regex = new RegExp(`^${regexPattern}$`); // Add start (^) and end ($) anchors

    const match = requestedPath.match(regex);
    if (match) {
      // Extract the dynamic keys from the route pattern
      const keys =
        dynamicRoute.path.match(/{([^}]+)}/g)?.map((key) => key.slice(1, -1)) ||
        [];

      // Create the result object mapping the dynamic keys to their values
      const result = keys.reduce((obj: any, key, index) => {
        obj[key] = match[index + 1]; // match[0] is the full match, so we start with match[1]
        return obj;
      }, {});

      return {
        route: dynamicRoute,
        pathParams: result,
      }; // Return the mapping object
    }
  }
  return null; // No match found
}

/**
 * Returns the url query parameters
 *
 * @export
 * @param {string} url
 * @return {*}  {Record<string, string>}
 */
export function getQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};

  // Create a URL object
  const urlObj = new URL(url);

  // Iterate through URLSearchParams and populate the params object
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function matchSchematicRoute(
  requestedPath: string,
  schematicRoutes: Route[]
): SchematicRoute | null {
  // loop through the schematic route array and keep checking for match
  for (let i = 0; i < schematicRoutes.length; i++) {
    if (requestedPath.includes(schematicRoutes[i].path.replace("*", ""))) {
      // match found return the first occurrence.

      /**
       * Extract the subpath
       * i.e suppose defined route is /foo/* and incoming is /foo/bar/blah
       * so extract the /bar/blah part
       */
      const subPath = extractSubRoute(schematicRoutes[i].path, requestedPath);

      return {
        route: schematicRoutes[i],
        subPath: subPath,
      };
    }
  }
  return null;
}
