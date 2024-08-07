import { BaseAPI } from './BaseAPI';

export interface ProfileData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    display_name: string;
}

export interface Password {
    oldPassword: string;
    newPassword: string;
}

export class UserApi extends BaseAPI {
    constructor() {
        super('/user');
    }

    setProfileData(data: ProfileData) {
        return this.http.put({
            url: '/profile',
            options: {
                data,
            },
        });
    };

    setAvatar(data: FormData) {
        return this.http.put({
            url: '/profile/avatar',
            options: {
                data,
            },
        });
    };

    changePassword(data: Password) {
        return this.http.put({
            url: '/password',
            options: {
                data,
            },
        });
    };

    searchUserByLogin(data: { login: string }) {
        return this.http.post({
            url: '/search',
            options: {
                data,
            },
        });
    };
}
