import { BaseAPI } from './BaseAPI';

export interface ISignInReq {
    login: 'string';
    password: 'string';
}

export interface ISignUpReq {
    first_name: 'string',
    second_name: 'string';
    login: 'string';
    email: 'string';
    password: 'string';
    phone: 'string';
}

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signIn(data: ISignInReq) {
        return this.http.post({
            url: '/signin',
            options: { data },
        });
    }

    signUp(data: ISignUpReq) {
        return this.http.post({
            url: '/signup',
            options: { data },
        });
    }

    logout() {
        return this.http.post({ url: '/logout' });
    };

    getUser() {
        return this.http.get({ url: '/user' });
    }
}
