import './SignUp.scss';
import { Block } from '../../utils/Block';
import { InputField } from '../../components';
import { Button } from '../../components';
import { Link } from '../../components';
import SignUpTemplate from './SignUp.hbs?raw';

export class SignUpPage extends Block {
    constructor() {
        super({
            submitBtn: new Button({
                title: 'Зарегистрироваться',
                className: 'sign-up-page__register-btn',
            }),
            signInLink: new Link({
                title: 'Войти',
                className: 'sign-up-page__sign-in-link',
                page: 'sign-in',
                url: '',
            }),
            lists: [
                new InputField({
                    label: 'Почта',
                    type: 'email',
                    name: 'email',
                    value: '',
                }),
                new InputField({
                    label: 'Логин',
                    type: 'text',
                    name: 'login',
                    value: '',
                }),
                new InputField({
                    label: 'Имя',
                    type: 'text',
                    name: 'first_name',
                    value: '',
                }),
                new InputField({
                    label: 'Фамилия',
                    type: 'text',
                    name: 'second_name',
                    value: '',
                }),
                new InputField({
                    label: 'Телефон',
                    type: 'tel',
                    name: 'phone',
                    value: '',
                }),
                new InputField({
                    label: 'Пароль',
                    type: 'password',
                    name: 'password',
                    value: '',
                }),
                new InputField({
                    label: 'Пароль (еще раз)',
                    type: 'password',
                    name: 'password',
                    value: '',
                }),
            ],
        });
    }

    render() {
        return SignUpTemplate;
    }
}
