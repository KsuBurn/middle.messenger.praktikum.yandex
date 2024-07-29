import './ChatPage.scss';
import Handlebars from 'handlebars';
import { Block } from '../../utils/Block';
import ChatPageTemplate from './ChatPage.hbs?raw';
import { Link } from '../../components';
import { InputField } from '../../components';
import { IconButton } from '../../components';
import { submitForm } from '../../utils/validation';

Handlebars.registerHelper('chat-page-list', () => {
    return [
        { name: 'Коржик', message: 'Изображение', unread: '2', time: '10:00' },
        { name: 'Лапик', message:'Go на свалку!', time: '11:00' },
        { name: 'Мики', message:'А у кого ключи от сарая?', unread: '4', time: '9:00'},
    ];
});

interface ChatPageProps {
    linkToProfile: Link;
    searchInput: InputField;
    messageInput: InputField;
    sendMessageBtn: IconButton;
    menuBtn: IconButton;
}

const linkToProfile = new Link({
    title: 'Профиль',
    url: '/settings',
    className: 'chat-page__profile-link',
    page: 'profile',
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

export class ChatPage extends Block<ChatPageProps> {
    constructor() {
        super({
            linkToProfile,
            searchInput,
            messageInput,
            sendMessageBtn,
            menuBtn,
        });
    }

    override render() {
        return ChatPageTemplate;
    }
}
