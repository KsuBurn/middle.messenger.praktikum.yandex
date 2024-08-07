import { EventBus } from '../utils/EventBus';
import { set } from '../utils/set';
import { Chat } from '../controllers/ChatsController';
import { cloneDeep } from '../utils/cloneDeep';

export enum StoreEvents {
    Updated = 'updated',
}

interface IState {
    user: null;
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
