import { getToken, verifyToken } from "../pages/Auth/Token";

const serverUrl = 'http://localhost:3000/';

const handleRequest = (
    url: string,
    method: string,
    headers?: HeadersInit,
    data?: object,
    // _isBiz: Boolean,
    checkToken = true
): Promise<Response> | null => {
    if (checkToken && !verifyToken()) {
        return null;
    }

    const config = {
        method,
        headers: {
            ...headers,
            'x-auth-token': getToken()
        },
        body: (data) ? JSON.stringify(data) : null
    }
    return fetch(url, config)

}

export const getRequest = (endPoint: string): Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'GET',
    );
}

export const postRequest = (endPoint: string, data: object, checkToken?: boolean):
    Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        data,
        checkToken
    );
}
export const patchRequest = (endPoint: string, data: object):
    Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'PUT',
        {
            'Content-Type': 'application/json'
        },
        data
    );
}

export const deleteRequest = (endPoint: string):
    Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'DELETE',
    );
}

export const getRequest2 = (data: object, endPoint: string): Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'GET',
        {
            'Content-Type': 'application/json'
        },
        data,
    );
}

export const postRequest2 = (endPoint: string, data: object, checkToken?: boolean):
    Promise<Response> | null => {
    return handleRequest(`${serverUrl}${endPoint}`,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        data,
        checkToken
    );
}