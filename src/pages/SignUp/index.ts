import './SignUp.scss';
import { Block } from '../../utils/Block';
import { Form, InputField } from '../../components';
import { Button } from '../../components';
import { Link } from '../../components';
import SignUpTemplate from './SignUp.hbs?raw';
import { checkValidation, submitForm } from '../../utils/validation';
import { SignUpFormContent } from '../../components/formsContent/SignUpFormContent';
import { Fields } from '../../utils/validationRules';

const emailInput = new InputField({
    label: 'Почта',
    type: 'email',
    name: 'email',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, emailInput);
        },
    },
});
const loginInput = new InputField({
    label: 'Логин',
    type: 'text',
    name: 'login',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, loginInput);
        },
    },
});
const nameInput = new InputField({
    label: 'Имя',
    type: 'text',
    name: 'first_name',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, nameInput);
        },
    },
});
const secondNameInput = new InputField({
    label: 'Фамилия',
    type: 'text',
    name: 'second_name',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, secondNameInput);
        },
    },
});
const phoneInput = new InputField({
    label: 'Телефон',
    type: 'tel',
    name: 'phone',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, phoneInput);
        },
    },
});
const passwordInput = new InputField({
    label: 'Пароль',
    type: 'password',
    name: 'password',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, passwordInput);
        },
    },
});
const passwordRepeatInput = new InputField({
    label: 'Пароль (еще раз)',
    type: 'password',
    name: 'password',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, passwordRepeatInput);
        },
    },
});

const signUpFormContent = new SignUpFormContent({
    submitBtn: new Button({
        title: 'Зарегистрироваться',
        className: 'sign-up-page__register-btn',
        type: 'submit',
    }),
    signInLink: new Link({
        title: 'Войти',
        className: 'sign-up-page__sign-in-link',
        page: 'sign-in',
        url: '',
    }),
    lists: [
        emailInput,
        loginInput,
        nameInput,
        secondNameInput,
        phoneInput,
        passwordInput,
        passwordRepeatInput,
    ],
});

const signUpForm = new Form({
    className: 'sign-up-page__form',
    events: {
        submit: (e) => {
            e.preventDefault();
            submitForm([
                emailInput,
                loginInput,
                nameInput,
                secondNameInput,
                phoneInput,
                passwordInput,
                passwordRepeatInput,
            ]);
        },
    },
    formContent: signUpFormContent,
});

export class SignUpPage extends Block {
    constructor() {
        super({
            signUpForm,
        });
    }

    render() {
        return SignUpTemplate;
    }
}
