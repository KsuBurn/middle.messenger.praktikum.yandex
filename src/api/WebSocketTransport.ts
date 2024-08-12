import { EventBus } from '../utils/EventBus';

export enum WebSocketEvents {
    CONNECTED = 'connected',
    ERROR = 'error',
    MESSAGE = 'message',
    CLOSE = 'close',
}

export class WebSocketTransport extends EventBus {
    private socket: WebSocket | null = null;
    private ping: NodeJS.Timeout | number | undefined;
    private websocketUrl: string;

    constructor(websocketUrl: string) {
        super();

        this.websocketUrl = websocketUrl;
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }

        (this.socket as WebSocket).send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.websocketUrl);

        this.subscribe(this.socket as WebSocket);

        this.setupPing();

        return new Promise((resolve) => {
            this.on(WebSocketEvents.CONNECTED, () => {
                resolve();
            });
        });
    }

    public close() {
        (this.socket as WebSocket)?.close();
    }

    private setupPing() {
        this.ping = setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000);

        this.on(WebSocketEvents.CLOSE, () => {
            clearInterval(this.ping as number);

            this.on(WebSocketEvents.CLOSE, () => {
                if (this.ping) {
                    clearInterval(this.ping as number);
                    this.ping = 0;
                }
            });
        });
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WebSocketEvents.CONNECTED);
        });
        socket.addEventListener('close', () => {
            this.emit(WebSocketEvents.CLOSE);
        });

        socket.addEventListener('error', (error) => {
            this.emit(WebSocketEvents.ERROR, error);
        });

        socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);

                if (data.type && data.type === 'pong') {
                    return;
                }

                this.emit(WebSocketEvents.MESSAGE, data);
            } catch (e) {
                console.error(e);
            }
        });
    }
}
