import { EventBus } from '../utils/EventBus';
import { set } from '../utils/set';

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
    },
    chats: [];
    activeChat: null;
}

class Store extends EventBus {
    private _state: IState = {
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
        activeChat: null,
    };

    public getState() {
        return this._state;
    }

    public set(path: string, value: unknown) {
        set(this._state, path, value);
        this.emit(StoreEvents.Updated);
        return this;
    };
}

export const store = new Store();
