import './ChatPage.scss';
import Handlebars from 'handlebars';
import { Block } from '../../utils/Block';
import ChatPageTemplate from './ChatPage.hbs?raw';
import { Link } from '../../components';
import { InputField } from '../../components';
import { IconButton } from '../../components';
import { submitForm } from '../../utils/validation';
import { ChatCreateDialog } from '../../components/chat/ChatCreateDialog';
import { ChatDeleteDialog } from '../../components/chat/ChatDeleteDialog';
import { AddUserToChatDialog } from '../../components/chat/AddUserToChatDialog';
import { DeleteUserFromChatDialog } from '../../components/chat/DeleteUserFromChatDialog';
import { chatsController } from '../../controllers/ChatsController';

Handlebars.registerHelper('chat-page-list', () => {
    return [
        { name: 'Коржик', message: 'Изображение', unread: '2', time: '10:00' },
        { name: 'Лапик', message:'Go на свалку!', time: '11:00' },
        { name: 'Мики', message:'А у кого ключи от сарая?', unread: '4', time: '9:00'},
    ];
});

const handleOpenModal = (event: Event, elementClass: string) => {
    if (event.target instanceof HTMLElement) {
        const element = document.querySelector(`.${elementClass}`);
        console.log(element)
        if (element) {
            element.classList.toggle('dialog-container_hidden');
        }
    }
};

interface ChatPageProps {
    linkToProfile: Link;
    searchInput: InputField;
    messageInput: InputField;
    sendMessageBtn: IconButton;
    menuBtn: IconButton;
    createChatBtn: IconButton;
    chatCreateDialog: ChatCreateDialog;
    chatDeleteDialog: ChatDeleteDialog
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
        click: () => {submitForm([messageInput]);},
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
    }
});

const deleteChatBtn = new IconButton({
    src: '../../assets/trash.svg',
    alt: 'Удалить чат',
    className: 'chat-page__delete-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_delete-chat-dialog'),
    }
});

const deleteUserFromChatBtn = new IconButton({
    src: '../../assets/deleteUser.svg',
    alt: 'Удалить пользователя из чата',
    className: 'chat-page__delete-user-from-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog'),
    }
});

const addUserToChatBtn = new IconButton({
    src: '../../assets/addUser.svg',
    alt: 'Добавить пользователя в чат',
    className: 'chat-page__add-user-to-chat-btn',
    events: {
        click: (e) => handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog'),
    }
});
const chatCreateDialog = new ChatCreateDialog({ handleOpenModal });
const chatDeleteDialog = new ChatDeleteDialog({ handleOpenModal });
const addUserToChatDialog = new AddUserToChatDialog({ handleOpenModal });
const deleteUserFromChatDialog = new DeleteUserFromChatDialog({ handleOpenModal });

export class ChatPage extends Block<ChatPageProps> {
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
        });

        chatsController.getChats();
    }

    override render() {
        return ChatPageTemplate;
    }
}
