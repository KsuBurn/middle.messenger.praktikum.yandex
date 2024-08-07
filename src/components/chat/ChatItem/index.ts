import './ChatItem.scss';
import ChatItemTemplate from './ChatItem.hbs?raw';
import { Block } from '../../../utils/Block';
import { ChatAvatar } from '../ChatAvatar';
import { Chat } from '../../../controllers/ChatsController';
import { store } from '../../../store/Store';

interface IChatItemProps {
    chat: Chat;
    avatar: string | null;
    lastMessage?: string[] | string;
    title: string;
    unreadCount: number;
    chatAvatar: ChatAvatar;
    time?: string;
    events: Record<string, EventListenerOrEventListenerObject>;
}

export class ChatItem extends Block<IChatItemProps> {
    constructor(props: { chat: Chat; }) {
        super({
            ...props,
            avatar: props.chat?.avatar,
            lastMessage: props.chat?.last_message?.content,
            time: props.chat?.last_message?.time,
            title: props.chat?.title,
            unreadCount: props.chat?.unread_count,
            chatAvatar: new ChatAvatar({ avatar: props.chat?.avatar }),
            events: {
                click: (e: Event) => {
                    e!.preventDefault();
                    const selectedChat = {
                        id: props.chat.id,
                        title: props.chat.title,
                        avatar: props.chat.avatar,
                    };
                    store.set('selectedChat', selectedChat);
                },
            },
        });
    }

    override render() {
        return ChatItemTemplate;
    }
}
