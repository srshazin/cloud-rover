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
        "Content-Type, Authorization"
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
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");

  return headers;
}
