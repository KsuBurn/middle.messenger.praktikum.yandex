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
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class HTTPTransport {
    static BASE_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.BASE_URL}${endpoint}`;
    }

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
        console.log('options', options)
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
            const resUrl = !!data && isGet ? `${this.endpoint}${url}${queryStringify(data as { [key: string]: unknown })}` : `${this.endpoint}${url}`;
            xhr.open(method, resUrl);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject(xhr.response);
            xhr.onerror = () => reject(xhr.response);

            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(xhr.response);

            xhr.withCredentials = true;

            if (!data || isGet) {
                xhr.send();
            } else {
                data instanceof FormData ? null : xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });
    };
}
