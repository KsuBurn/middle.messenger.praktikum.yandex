import { ChatsApi } from '../api/ChatsApi';

class ChatsController {
    private readonly _chatsApi;
    constructor() {
        this._chatsApi = new ChatsApi();
    }

    async getChats() {
        try {
            await this._chatsApi.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async createChat(data: unknown) {
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
            await this._chatsApi.addUserToChat(data);
            this.getChats();
        } catch (error: unknown) {
            console.error(error);
        }
    }

    async removeUserFromChat(data: { users: number[]; chatId: number }) {
        try {
            await this._chatsApi.removeUserFromChat(data);
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
