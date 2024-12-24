interface Reply {
    text(text: string, status?: number, headers?: Headers): Promise<Response>,
    html(html: string, status?: number, headers?: Headers): Promise<Response>,
    json(body: object, status?: number, headers?: Headers): Promise<Response>,
    error(msg: string, errorStatus: number, headers?: Headers): Promise<Response>,
}

export const reply: Reply = {
    text: replyWithText,
    html: replyWithHTML,
    json: replyWithJSONBody,
    error: replyError,
}


async function replyWithText(text: string, status: number = 200, headers: Headers = new Headers()) {
    return new Response(text, {
        headers: headers,
        status: status
    })
}


async function replyWithHTML(html: string, status: number = 200, headers: Headers = new Headers()) {
    // overriding default Content-Type
    if (headers.has("Content-Type")) {
        headers.delete("Content-Type")
    }
    // setting the content type as text/html
    headers.append("Content-Type", "text/html; charset=utf-8")
    return new Response(html, {
        headers: headers,
        status: status
    })
}


async function replyWithJSONBody(body: object, status: number = 200, headers: Headers = new Headers()) {
    const providedHeaders = headers
    // overriding default Content-Type
    if (providedHeaders.has("Content-Type")) {
        providedHeaders.delete("Content-Type")
    }
    // setting the content type as json
    providedHeaders.append("Content-Type", "application/json")

    // finally returning the response
    return new Response(JSON.stringify(body), {
        headers: headers,
        status: status
    })

}

async function replyError(msg: string, errorStatus: number, headers: Headers = new Headers()) {
    const providedHeaders = headers
    // overriding default Content-Type
    if (providedHeaders.has("Content-Type")) {
        providedHeaders.delete("Content-Type")
    }
    // setting the content type as json
    providedHeaders.append("Content-Type", "application/json")

    // finally returning the response
    return new Response(JSON.stringify({
        success: false,
        message: msg
    }), {
        headers: headers,
        status: errorStatus
    })

}
