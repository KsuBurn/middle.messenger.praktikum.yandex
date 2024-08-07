import { ChatsApi } from '../api/ChatsApi';
import { store } from '../store/Store';
import { IUser, userController } from './UserController';

export interface Chat {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number;
    created_by: number;
    last_message: {
        user: IUser;
        time: string;
        content: string[] | string;
    } | null;
}

class ChatsController {
    private readonly _chatsApi;
    constructor() {
        this._chatsApi = new ChatsApi();
    }

    async getChats() {
        try {
            const data = await this._chatsApi.getChats();
            store.set('chats', JSON.parse(data as string));
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async createChat(data: { title: string }) {
        try {
            await this._chatsApi.createNewChat(data);
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async deleteChat(id: { chatId: number }) {
        try {
            await this._chatsApi.deleteChat(id);
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async addUserToChat(data: { userLogin: string; chatId: number }) {
        try {
            const users = await userController.searchUserByLogin({ login: data.userLogin }) as IUser[];
            if (users.length) {
                const user = users.find(item => item.login === data.userLogin);
                if (user) {
                    await this._chatsApi.addUserToChat({ users: [user.id], chatId: data.chatId});
                    this.getChats();
                }
            }
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async removeUserFromChat(data: { userLogin: string; chatId: number }) {
        try {
            const users = await userController.searchUserByLogin({ login: data.userLogin }) as IUser[];
            if (users.length) {
                const user = users.find(item => item.login === data.userLogin);
                if (user) {
                    await this._chatsApi.removeUserFromChat({ users: [user.id], chatId: data.chatId});
                    this.getChats();
                }
            }
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }
    getWSToken(id: number) {
        return this._chatsApi.getToken(id);
    }
}

export const chatsController = new ChatsController();
