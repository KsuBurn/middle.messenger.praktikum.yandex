import './ChatWindow.scss';
import ChatWindowTemplate from './ChatWindow.hbs?raw';
import { Block } from '../../../utils/Block';
import { ChatMessage } from '../ChatMessage';
import { connect } from '../../../store/connect';
import { IChat } from '../../../controllers/ChatsController';
import { IUser } from '../../../controllers/UserController';
import { Indexed } from '../../../utils/types';
import { isEqual } from '../../../utils/isEqual';
import { IMessage } from '../../../controllers/WebSocketController';

interface IChatWindowProps {

}


export class ChatWindowClass extends Block<IChatWindowProps> {
    constructor() {
        super({
            messagesList: [],
        });
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
        if (!isEqual(oldProps, newProps)) {
            const messagesList = newProps.messages.map((message: IMessage) => new ChatMessage({ message }));
            this.lists = { messagesList: messagesList };
            return true;
        }
        return false;
    }

    override render() {
        return ChatWindowTemplate;
    }
}

const withCurrentChatMessages = connect((state) => {
    const currentChatId = (state.selectedChat as IChat)?.id || null;

    if (!currentChatId) {
        return {
            messages: [],
            currentChat: null,
            userId: (state.user as IUser)?.id || null,
        };
    }

    return {
        messages: (state.messages || {})[currentChatId] || [],
        selectedChat: state.selectedChat,
        userId: (state.user as IUser)?.id || null,
    };
});

export const ChatWindow = withCurrentChatMessages(ChatWindowClass as typeof Block);
