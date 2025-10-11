export function containsDynamicRoute(path: string) {
  const dynamicPattern = /\{[^}]+\}/g; // Matches text inside curly braces
  return dynamicPattern.test(path);
}

/**
 *
 *
 * @export
 * @param {(string | null)} origin
 * @param {(string[] | string)} [allowedOrigins]
 * @return {*}
 */
export function getCorsHeaders(
  origin: string | null,
  requestedHeaders: string | null,
  allowedOrigins?: string[] | string
) {
  if (!origin || !allowedOrigins) {
    return new Headers();
  }
  const headers = new Headers();

  // check if allowed origin is set to *
  if (typeof allowedOrigins == "string") {
    if (allowedOrigins == "*") {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, DELETE, PUT"
      );
      headers.set(
        "Access-Control-Allow-Headers",
        requestedHeaders ? requestedHeaders : "authorization, content-type"
      );
      headers.set("Access-Control-Allow-Credentials", "true");
    }
    return headers;
  }

  // allowed origins is an array of origins
  // check if current origin exists in the whitelist

  if (!allowedOrigins.includes(origin)) {
    return new Headers();
  }
  headers.set("Access-Control-Allow-Origin", origin);
  // finally append all the necessary cors headers
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, DELETE, PUT"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders ? requestedHeaders : "authorization, content-type"
  );
  headers.set("Access-Control-Allow-Credentials", "true");

  return headers;
}
/**
 * an utility function that extracts the wildcard path from a given schematic path.
 * @param defined - defined path in the router
 * @param incoming - incoming request path
 * @returns  string or undefined
 */
export function extractSubRoute(
  defined: string,
  incoming: string
): string | undefined {
  // Ensure wildcard exists
  if (!defined.includes("*")) {
    return undefined;
  }

  // Remove trailing * from defined
  const base = defined.replace(/\/\*$/, "");

  // If incoming doesn’t start with base, not a match
  if (!incoming.startsWith(base)) {
    return undefined;
  }

  // Slice off the base part
  const remainder = incoming.slice(base.length);

  // Ensure it starts with a slash
  return remainder.startsWith("/") ? remainder : "/" + remainder;
}
