import { EventBus } from '../utils/EventBus';
import { set } from '../utils/set';
import { Chat } from '../controllers/ChatsController';
import { cloneDeep } from '../utils/cloneDeep';
import { IUser } from '../controllers/UserController';
import { Message } from '../controllers/WebSocketController';

export enum StoreEvents {
    Updated = 'updated',
}

interface IState {
    user: IUser | null;
    profileForm: {
        isDataChanging: false;
        isPasswordChanging: false;
    };
    profileAvatarForm: {
        selectedAvatarFile: File | null;
        error: string | null;
    };
    chats: Chat[];
    selectedChat: {
        id: number;
        title: string;
        avatar: string;
    } | null;
    messages: Record<number, Message[]>;
}

const initialState: IState = {
    user: null,
    profileForm: {
        isDataChanging: false,
        isPasswordChanging: false,
    },
    profileAvatarForm: {
        selectedAvatarFile: null,
        error: null,
    },
    chats: [],
    selectedChat: null,
    messages: [],
};

class Store extends EventBus {
    private _state: IState;

    constructor() {
        super();

        this._state = cloneDeep(initialState) as IState;
    }

    public getState() {
        return this._state;
    }

    public set(path: string, value: unknown) {
        const newState = cloneDeep(this._state);
        this._state = set(newState, path, value) as IState;
        this.emit(StoreEvents.Updated);
        return this;
    };

    public removeState() {
        this._state = cloneDeep(initialState) as IState;
        this.emit(StoreEvents.Updated);
    }
}

export const store = new Store();
