import { Password, ProfileData, UserApi } from '../api/UserApi';

class UserController {
    private readonly _userApi;
    constructor() {
        this._userApi = new UserApi();
    }

    async setProfileData(data: ProfileData) {
        try {
            await this._userApi.setProfileData(data);
        } catch (e) {
            console.error(e);
        }
    };

    async setAvatar(data: FormData) {
        try {
            await this._userApi.setAvatar(data);
        } catch (e) {
            console.error(e);
        }
    };

    async changePassword(data: Password) {
        try {
            await this._userApi.changePassword(data);
        } catch (e) {
            console.error(e);
        }
    };
}

export const userController = new UserController();
