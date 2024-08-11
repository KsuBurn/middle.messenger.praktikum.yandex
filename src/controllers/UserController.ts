import { IPassword, IProfileData, UserApi } from '../api/UserApi';
import { store } from '../store/Store';

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
}


class UserController {
    private readonly _userApi;
    constructor() {
        this._userApi = new UserApi();
    }

    async setProfileData(data: IProfileData) {
        try {
            const userData = await this._userApi.setProfileData(data);
            store.set('user', JSON.parse(userData as string));
        } catch (e) {
            console.error(e);
        }
    };

    async setAvatar(data: FormData) {
        try {
            const userData = await this._userApi.setAvatar(data);
            store.set('user', JSON.parse(userData as string));
        } catch (e) {
            console.error(e);
        }
    };

    async changePassword(data: IPassword) {
        try {
            await this._userApi.changePassword(data);
        } catch (e) {
            console.error(e);
        }
    };

    async searchUserByLogin(data: { login: string }) {
        try {
            const usersData = await this._userApi.searchUserByLogin(data);
            return JSON.parse(usersData as string);
        } catch (e) {
            console.error(e);
            return;
        }
    };
}

export const userController = new UserController();
