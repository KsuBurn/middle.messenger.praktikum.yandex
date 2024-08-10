import { ChatsApi } from '../api/ChatsApi';
import { store } from '../store/Store';
import { IUser } from './UserController';
import { webSocketController } from './WebSocketController';

export interface IChat {
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
            const chats = JSON.parse(data as string);
            (chats as unknown as IChat[]).map(async (chat: IChat) => {
                const token = await this.getWSToken(chat.id);
                await webSocketController.connect(chat.id, token);
            });
            store.set('chats', chats);
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

    async addUserToChat(data: { users: number[]; chatId: number }) {
        try {
            await this._chatsApi.addUserToChat({ users: data.users, chatId: data.chatId});
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
        return;
    }

    async removeUserFromChat(data: { users: number[]; chatId: number }) {
        try {
            await this._chatsApi.removeUserFromChat({ users: data.users, chatId: data.chatId});
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async getWSToken(id: number) {
        const data = await this._chatsApi.getToken(id);
        return (JSON.parse(data as string)).token;
    }
}

export const chatsController = new ChatsController();
