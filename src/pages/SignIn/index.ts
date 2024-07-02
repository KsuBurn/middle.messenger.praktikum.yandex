import './SignIn.scss';
import { Block } from '../../utils/Block';
import { Button } from '../../components';
import { Link } from '../../components';
import { InputField } from '../../components';
import SignInTemplate from './SignIn.hbs?raw';

export class SignInPage extends Block {
    constructor() {
        super({
            submitBtn: new Button({
                title: 'Авторизоваться',
                className: 'sign-in-page__login-btn',
            }),
            signUpLink: new Link({
                title: 'Нет аккаунта?',
                className: 'sign-in-page__sign-up-link',
                page: 'sign-up',
                url: '',
            }),
            lists: [
                new InputField({
                    label: 'Логин',
                    type: 'text',
                    name: 'login',
                    value: '',
                }),
                new InputField({
                    label: 'Пароль',
                    type: 'password',
                    name: 'password',
                    value: '',
                }),
            ],
        });
    }

    render() {
        return SignInTemplate;
    }
}
