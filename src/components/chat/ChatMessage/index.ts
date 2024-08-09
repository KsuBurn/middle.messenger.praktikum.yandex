import './ChatMessage.scss';
import ChatMessageTemplate from './ChatMessage.hbs?raw';
import { Block } from '../../../utils/Block';
import { Message } from '../../../controllers/WebSocketController';
import { store } from '../../../store/Store';
import formatDate from '../../../utils/formatDate';

interface IChatMessageProps {
    message: Message;
    isOwn: boolean;
    text: string;
    time: string | null;
}

export class ChatMessage extends Block<IChatMessageProps> {
    constructor(props: { message: Message; }) {
        super({
            ...props,
            isOwn: props.message.user_id === store.getState().user?.id,
            text: props.message.content,
            time: formatDate(props.message.time),
        });
    }

    override render() {
        return ChatMessageTemplate;
    }
}
