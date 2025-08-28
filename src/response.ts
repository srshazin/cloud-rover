/**
 * Type definition for Reply object
 *
 * @interface Reply
 */
interface Reply {
  text(text: string, status?: number, headers?: Headers): Promise<Response>;
  html(html: string, status?: number, headers?: Headers): Promise<Response>;
  json(body: object, status?: number, headers?: Headers): Promise<Response>;
  error(msg: string, errorStatus: number, headers?: Headers): Promise<Response>;
}

/**
 * standard reply object from cloud-rover
 * available methods:
 - `text`  parameters `text: string, status?: number, headers?: Headers` @returns `Promise<Response>`
 - `json` parameters `body: object, status?: number, headers?: Headers` @returns `Promise<Response>`
 - `html` parameters `html: string, status?: number, headers?: Headers` @returns `Promise<Response>`
 - `error` parameters `msg: string, errorStatus: number, headers?: Headers`@returns `Promise<Response>`
 */
export const reply: Reply = {
  text: replyWithText,
  html: replyWithHTML,
  json: replyWithJSONBody,
  error: replyError,
};

/**
 * create a simple text based reply with no preset Content-Type
 *
 * @param {string} text
 * @param {number} [status=200]
 * @param {Headers} [headers=new Headers()]
 * @return {*}
 */
async function replyWithText(
  text: string,
  status: number = 200,
  headers: Headers = new Headers()
) {
  return new Response(text, {
    headers: headers,
    status: status,
  });
}

/**
 * create an html response with a preset of Content-Type as text/html; charset=utf-8
 *
 * @param {string} html
 * @param {number} [status=200]
 * @param {Headers} [headers=new Headers()]
 * @return {*}
 */
async function replyWithHTML(
  html: string,
  status: number = 200,
  headers: Headers = new Headers()
) {
  // overriding default Content-Type
  if (headers.has("Content-Type")) {
    headers.delete("Content-Type");
  }
  // setting the content type as text/html
  headers.append("Content-Type", "text/html; charset=utf-8");
  return new Response(html, {
    headers: headers,
    status: status,
  });
}

/**
 * create a JSON response with a preset of Content-Type as **application/json**
 * anything parsable by `JSON.parse()` or `JSON.stringify()` will work as a param
 *
 * @param {object} body
 * @param {number} [status=200]
 * @param {Headers} [headers=new Headers()]
 * @return {*}
 */
async function replyWithJSONBody(
  body: object,
  status: number = 200,
  headers: Headers = new Headers()
) {
  const providedHeaders = headers;
  // overriding default Content-Type
  if (providedHeaders.has("Content-Type")) {
    providedHeaders.delete("Content-Type");
  }
  // setting the content type as json
  providedHeaders.append("Content-Type", "application/json");

  // finally returning the response
  return new Response(JSON.stringify(body), {
    headers: headers,
    status: status,
  });
}

/**
 * create an error JSON response with a preset of Content-Type as **application/json**
 * response must provide an error status code
 * a default format `{"success": false, "message": <string >}` will be used
 * for making a custom format use the standard [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object
 * @param {string} msg
 * @param {number} errorStatus
 * @param {Headers} [headers=new Headers()]
 * @return {*}
 */
async function replyError(
  msg: string,
  errorStatus: number,
  headers: Headers = new Headers()
) {
  const providedHeaders = headers;
  // overriding default Content-Type
  if (providedHeaders.has("Content-Type")) {
    providedHeaders.delete("Content-Type");
  }
  // setting the content type as json
  providedHeaders.append("Content-Type", "application/json");

  // finally returning the response
  return new Response(
    JSON.stringify({
      success: false,
      message: msg,
    }),
    {
      headers: headers,
      status: errorStatus,
    }
  );
}
