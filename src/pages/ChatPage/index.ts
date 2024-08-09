import './ChatPage.scss';
import { Block } from '../../utils/Block';
import ChatPageTemplate from './ChatPage.hbs?raw';
import { Link } from '../../components';
import { InputField } from '../../components';
import { IconButton } from '../../components';
import { ChatCreateDialog } from '../../components/chat/ChatCreateDialog';
import { ChatDeleteDialog } from '../../components/chat/ChatDeleteDialog';
import { AddUserToChatDialog } from '../../components/chat/AddUserToChatDialog';
import { DeleteUserFromChatDialog } from '../../components/chat/DeleteUserFromChatDialog';
import { Chat, chatsController } from '../../controllers/ChatsController';
import { handleOpenModal } from '../../utils/habdleOpenModal';
import { ChatItem } from '../../components/chat/ChatItem';
import { ChatAvatar } from '../../components/chat/ChatAvatar';
import { connect } from '../../store/connect';
import { Indexed } from '../../utils/types';
import { isEqual } from '../../utils/isEqual';
import { ChatWindow } from '../../components/chat/ChatWindow';
import { webSocketController } from '../../controllers/WebSocketController';
import { store } from '../../store/Store';

const chatWindow = new ChatWindow({});

interface IChatPageProps {
    linkToProfile: Link;
    searchInput: InputField;
    messageInput: InputField;
    sendMessageBtn: IconButton;
    menuBtn: IconButton;
    createChatBtn: IconButton;
    deleteChatBtn: IconButton;
    addUserToChatBtn: IconButton;
    deleteUserFromChatBtn: IconButton;
    chatCreateDialog: ChatCreateDialog;
    chatDeleteDialog: ChatDeleteDialog
    addUserToChatDialog: AddUserToChatDialog;
    deleteUserFromChatDialog: DeleteUserFromChatDialog;
    chatAvatar: ChatAvatar;
    isChatSelected: boolean;
    selectedChatTitle: string;
    chatWindow: typeof chatWindow;
}

const linkToProfile = new Link({
    title: 'Профиль',
    url: '/settings',
    className: 'chat-page__profile-link',
    endIcon: '../../assets/arrowBackIos.svg',
});
const searchInput =  new InputField({
    className: 'chat-page__search-field',
    type: 'text',
    name: 'search',
    placeholder: 'Поиск',
    events: {},
});
const messageInput = new InputField({
    className: 'chat-page__message-field',
    type: 'text',
    name: 'message',
    placeholder: 'Сообщение',
    events: {},
});
const sendMessageBtn = new IconButton({
    src: '../../assets/arrowRight.svg',
    alt: 'Кнопка отправить сообщение',
    events: {
        click: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            const input = document.querySelector('.chat-page__message-field')?.querySelector('input')
            if(input?.value) {
                const chatId = store.getState().selectedChat?.id;
                webSocketController.sendMessage(chatId as number, input?.value);
                input.value = '';
            }
        },
    },
});
const menuBtn = new IconButton({
    src: '../../assets/dots.svg',
    alt: 'Кнопка меню',
    className: 'chat-page__menu-btn',
});
const createChatBtn = new IconButton({
    src: '../../assets/plusIcon.svg',
    alt: 'Кнопка создать чат',
    className: 'chat-page__create-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_create-chat-dialog'),
    },
});
const deleteChatBtn = new IconButton({
    src: '../../assets/trash.svg',
    alt: 'Удалить чат',
    className: 'chat-page__delete-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_delete-chat-dialog'),
    },
});
const deleteUserFromChatBtn = new IconButton({
    src: '../../assets/deleteUser.svg',
    alt: 'Удалить пользователя из чата',
    className: 'chat-page__delete-user-from-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog'),
    },
});
const addUserToChatBtn = new IconButton({
    src: '../../assets/addUser.svg',
    alt: 'Добавить пользователя в чат',
    className: 'chat-page__add-user-to-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog'),
    },
});
const chatCreateDialog = new ChatCreateDialog({ handleOpenModal });
const chatDeleteDialog = new ChatDeleteDialog({ handleOpenModal });
const addUserToChatDialog = new AddUserToChatDialog({ handleOpenModal });
const deleteUserFromChatDialog = new DeleteUserFromChatDialog({ handleOpenModal });

const chatAvatar = new ChatAvatar({ avatar: '' });

export class ChatPageClass extends Block<IChatPageProps> {
    constructor() {
        super({
            linkToProfile,
            searchInput,
            messageInput,
            sendMessageBtn,
            menuBtn,
            createChatBtn,
            chatCreateDialog,
            chatDeleteDialog,
            addUserToChatDialog,
            deleteUserFromChatDialog,
            deleteChatBtn,
            addUserToChatBtn,
            deleteUserFromChatBtn,
            chatAvatar,
            isChatSelected: false,
            selectedChatTitle: '',
            chatWindow,
        });

        chatsController.getChats();
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
        if (!isEqual(oldProps.chats || [], newProps.chats)) {
            const chatList = newProps.chats.map((chat: Chat) => new ChatItem({ chat }));
            this.lists = { chatList: chatList };
            return true;
        }

        if (!isEqual(oldProps.selectedChat || {}, newProps.selectedChat || {})) {
            this.setProps({
                ...this.props,
                isChatSelected: !!newProps.selectedChat,
                selectedChatTitle: newProps.selectedChat.title,
            });
            chatAvatar.setProps({ avatar: newProps.selectedChat.avatar });
            return true;
        }
        return false;

    }

    override render() {
        return ChatPageTemplate;
    }
}

const withChats = connect(state => ({ chats: state.chats, selectedChat: state.selectedChat }));
export const ChatPage = withChats(ChatPageClass as typeof Block);
