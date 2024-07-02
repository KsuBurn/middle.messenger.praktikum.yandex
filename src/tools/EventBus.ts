interface IEventBus {
    listeners: {
        [key: string]: Array<(...args: unknown[]) => void>;
    };
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    off: (event: string, callback: (...args: unknown[]) => void) => void;
    emit: (event: string, args: unknown) => void;
}

export class EventBus implements IEventBus {
    listeners: {
        [key: string]: Array<(...args: unknown[]) => void>;
    };
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: any[]) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: unknown[]) => void): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}
