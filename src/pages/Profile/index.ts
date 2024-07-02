import './Profile.scss';
import { Block } from '../../tools/Block';
import { Divider } from '../../components';
import { IconButton } from '../../components';
import { Button } from '../../components';
import { ProfileInput } from '../../components';
import ProfileTemplate from './Profile.hbs?raw';

export class ProfilePage extends Block {
    constructor() {
        super({
            isDataChanging: false,
            isPasswordChanging: false,
            isSomeChanging: false,
            divider: new Divider({}),
            backBtn: new IconButton({
                src: '../../assets/arrowRight.svg',
                alt: 'Кнопка назад',
                page: 'chat',
            }),
            saveBtn: new Button({
                title: 'Сохранить',
                className: 'profile__save-btn',
            }),
            changeDataBtn: new Button({
                title: 'Изменить данные',
                buttonType: 'outlined',
            }),
            changePasswordBtn: new Button({
                title: 'Изменить пароль',
                buttonType: 'outlined',
            }),
            exitBtn: new Button({
                title: 'Выйти',
                className: 'profile__exit-button',
                page: 'sign-in',
                buttonType: 'outlined',
            }),
            oldPassInput: new ProfileInput({
                label: 'Старый пароль',
                name: 'oldPassword',
                type: 'password',
                value: '12345678',
            }),
            newPassInput: new ProfileInput({
                label: 'Новый пароль',
                name: 'newPassword',
                type: 'password',
                value: '12345678',
            }),
            repeatedNewPassInput: new ProfileInput({
                label: 'Повторите новый пароль',
                name: 'newPassword',
                type: 'password',
                value: '12345678',
            }),
            emailInput: new ProfileInput({
                label: 'Почта',
                type: 'email',
                name: 'email',
                value: 'pochta@yandex.ru',
            }),
            loginInput: new ProfileInput({
                label: 'Логин',
                type: 'text',
                name: 'login',
                value: 'ivanivanov',
            }),
            nameInput: new ProfileInput({
                label: 'Имя',
                type: 'text',
                name: 'first_name',
                value: 'Иван',
            }),
            secondNameInput: new ProfileInput({
                label: 'Фамилия',
                type: 'text',
                name: 'second_name',
                value: 'Иванов',
            }),
            chatNameInput: new ProfileInput({
                label: 'Имя в чате',
                type: 'text',
                name: 'display_name',
                value: 'Иван',
            }),
            phoneInput: new ProfileInput({
                label: 'Телефон',
                type: 'tel',
                name: 'phone',
                value: '',
            }),
        });
    }

    render() {
        return ProfileTemplate;
    }
}
