import { Route } from "./types";

export function Router(routes: Route[]): Route[] {
    return routes
}

interface DynamicRouteData {
    route: Route,
    pathParams: object
}

export function findDynamicRoute(inputRoute: string, dynamicRoutes: Route[]): DynamicRouteData | null {
    for (const dynamicRoute of dynamicRoutes) {
        // Convert dynamic route to a regex pattern and capture dynamic values
        const regexPattern = dynamicRoute.path
            .replace(/{[^}]+}/g, '([^/]+)') // Replace placeholders with a regex to match path segments
            .replace(/\//g, '\\/');         // Escape slashes

        const regex = new RegExp(`^${regexPattern}$`); // Add start (^) and end ($) anchors

        const match = inputRoute.match(regex);
        if (match) {
            // Extract the dynamic keys from the route pattern
            const keys = dynamicRoute.path.match(/{([^}]+)}/g)?.map(key => key.slice(1, -1)) || [];

            // Create the result object mapping the dynamic keys to their values
            const result = keys.reduce((obj: any, key, index) => {
                obj[key] = match[index + 1]; // match[0] is the full match, so we start with match[1]
                return obj;
            }, {});

            return {
                route: dynamicRoute,
                pathParams: result
            }; // Return the mapping object
        }
    }
    return null; // No match found
}


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