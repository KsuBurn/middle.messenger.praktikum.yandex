import { store } from '../store/Store';
import { WebSocketEvents, WebSocketTransport } from '../api/WebSocketTransport';

export interface IMessage {
    chat_id: number;
    time: string;
    type: string;
    id: string;
    user_id: number;
    content: string;
    is_read: boolean;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    }
}

class WebSocketController {
    private baseURL : string = 'wss://ya-praktikum.tech/ws/chats';
    private sockets: Map<number, WebSocketTransport> = new Map();

    async connect(chatId: number, token: string) {
        if (this.sockets.has(chatId)) {
            return;
        }

        const userId = store.getState().user?.id;
        const ws = new WebSocketTransport(`${this.baseURL}/${userId}/${chatId}/${token}`);
        this.sockets.set(chatId, ws);

        await ws.connect();
        this.subscribe(ws, chatId);
        this.getMessages(chatId);
    }

    private subscribe(transport: WebSocketTransport, chatId: number) {
        transport.on(WebSocketEvents.MESSAGE, (message) => this.onMessage(chatId, message));
        transport.on(WebSocketEvents.CLOSE, () => this.onClose(chatId));
    }

    public sendMessage(chatId: number, message: string) {
        const currentChatSocket = this.sockets.get(chatId);

        if (!currentChatSocket) {
            throw new Error(`Chat with id:${chatId} is not connected.`);
        }

        currentChatSocket.send({
            type: 'message',
            content: message,
        });
    }

    public getMessages(chatId: number) {
        const currentChatSocket = this.sockets.get(chatId);
        if (!currentChatSocket) {
            throw new Error(`Chat with id:${chatId} is not connected.`);
        }

        currentChatSocket.send({
            type: 'get old',
            content: null,
        });
    }

    private onClose(chatId: number) {
        this.sockets.delete(chatId);
    }

    private onMessage(chatId: number, messages: IMessage | IMessage[]) {
        let messagesToAdd: IMessage[] = [];

        if (Array.isArray(messages)) {
            messagesToAdd = (messages.reverse());
        } else {
            messagesToAdd.push(messages);
        }
        const currentMessages = (store.getState().messages || {})[chatId] || [];
        store.set(`messages.${chatId}`, [ ...currentMessages, ...messagesToAdd ]);
    }
}

export const webSocketController = new WebSocketController();
