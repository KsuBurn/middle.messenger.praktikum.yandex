import './ChatPage.scss';
import Handlebars from 'handlebars';
export { default as ChatPage } from './ChatPage.hbs?raw'

Handlebars.registerHelper('chat-page-list', () => {
    return [
        { name: 'Коржик', message: 'Изображение', unread: '2', time: '10:00' },
        { name: 'Лапик', message:'Go на свалку!', time: '11:00' },
        { name: 'Мики', message:'А у кого ключи от сарая?', unread: '4', time: '9:00'},
    ]
});
