import { queryStringify } from './queryStringify';

type HTTPMethodOptionsType = {
    method?: string;
    data?: Object;
    headers?: { [key: string]: string };
    timeout?: number;
}

type HTTPMethodType = ( arg: {
    url: string,
    options?: HTTPMethodOptionsType,
    timeout?: number,
}) => Promise<unknown>;

enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export class HTTPTransport {
    get: HTTPMethodType = ({ url, options= {} }) => {
        return this.request({
            url,
            options: {
                ...options,
                method: Methods.GET,
            },
            timeout: options.timeout,
        });
    };

    post: HTTPMethodType = ({ url, options= {} }) => {
        return this.request({
            url,
            options: {
                ...options,
                method: Methods.POST,
            },
            timeout: options.timeout,
        });
    };

    put: HTTPMethodType = ({ url, options= {} }) => {
        return this.request({
            url,
            options: {
                ...options,
                method: Methods.PUT,
            },
            timeout: options.timeout,
        });
    };

    delete: HTTPMethodType = ({ url, options= {} }) => {
        return this.request({
            url,
            options: {
                ...options,
                method: Methods.DELETE,
            },
            timeout: options.timeout,
        });
    };

    request: HTTPMethodType = ({ url, options = {}, timeout = 5000 }) => {
        const {
            method,
            data,
            headers = {},
        } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }
            const isGet = method === Methods.GET;

            const xhr = new XMLHttpRequest();
            const resUrl = !!data && isGet ? `${url}${queryStringify(data as { [key: string]: unknown })}` : url;
            xhr.open(method, resUrl);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (!data || isGet) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    };
}
