import { reply } from "./response"
import { findDynamicRoute } from "./router"
import { Route } from "./types"
import { containsDynamicRoute } from "./utils"

export async function Rover(request: Request, router: Route[]): Promise<Response> {
    // requested path
    const requestedPath = new URL(request.url).pathname
    // check whether the absolute path exists in the router array
    const route = router.filter(route => route.path == requestedPath)[0]

    // now we list all the dynamic routes here if static route is not found
    if (!route) {
        const dynamicRoutes = router.filter(t => containsDynamicRoute(t.path))
        // now we match the route with available dynamic routes
        const matchedDynamicRoute = findDynamicRoute(requestedPath, dynamicRoutes)
        console.log("Found dynamic route ", matchedDynamicRoute);

    }


    if (route) {
        // check if method is defined in the router
        if (route.method) {
            if (request.method.toLowerCase() != route.method.toLocaleLowerCase()) {
                return reply.error("Method not allowed.", 405)
            }
        } else {
            // in that case by default only GET method is allowed
            if (request.method != "GET") {
                return reply.error("Method not allowed.", 405)
            }
        }
        return route.handler(request)
    }
    else {
        return new Response("404 Not Found")
    }
}