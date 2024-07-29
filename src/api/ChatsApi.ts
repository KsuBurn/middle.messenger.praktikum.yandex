import { BaseAPI } from './BaseAPI';

interface IChatUsers {
    users: number[];
    chatId: number;
}

export class ChatsApi extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats() {
        return this.http.get({ url: '' });
    };

    createNewChat(data) {
        return this.http.post({
            url: '',
            options: {
                data,
            },
        });
    };

    deleteChat(data){
        return this.http.delete({
            url: '',
            options: {
                data,
            },
        });
    };

    addUserToChat(data: IChatUsers) {
        return this.http.put({
            url: '/users',
            options: {
                data,
            },
        });
    };

    removeUserFromChat(data: IChatUsers) {
        return this.http.delete({
            url: '/users',
            options: {
                data,
            },
        });
    };

    getToken(id: number) {
        return this.http.post({ url: `/token/${id}`});
    };
}
