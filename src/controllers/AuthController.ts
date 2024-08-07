import { router } from '../router/Router';
import { PagesUrls } from '../router/types';
import { AuthAPI, ISignInReq, ISignUpReq } from '../api/AuthApi';
import { store } from '../store/Store';

class AuthController {
    private readonly _authApi;

    constructor() {
        this._authApi = new AuthAPI();
    }

    async signIn(data: ISignInReq) {
        try {
            await this._authApi.signIn(data);
            await this.getUser();
            router.go(PagesUrls.CHAT);
        } catch (e: unknown) {
            const reason = JSON.parse(e as string)?.reason;
            if (reason === 'User already in system') {
                router.go(PagesUrls.CHAT);
            } else {
                console.error(e);
            }
        }
    }

    async signUp(data: ISignUpReq) {
        try {
            await this._authApi.signUp(data);
            await this.getUser();
        } catch (e) {
            console.error(e);
        }
    }

    async logout() {
        try {
            await this._authApi.logout();
            router.go(PagesUrls.SIGN_IN);
        } catch (e) {
            console.error(e);
        }
    };

    async getUser() {
        try {
            const data = await this._authApi.getUser();
            store.set('user', JSON.parse(data as string));
        } catch (e) {
            console.error(e);
        }
    }
}

export const authController = new AuthController();
