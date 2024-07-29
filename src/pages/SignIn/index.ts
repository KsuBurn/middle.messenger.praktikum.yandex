import './SignIn.scss';
import { Block } from '../../utils/Block';
import { Button, Form, InputField, Link } from '../../components';
import SignInTemplate from './SignIn.hbs?raw';
import { SignInFormContent } from '../../components';
import { checkValidation, submitForm } from '../../utils/validation';
import { Fields } from '../../utils/validationRules';
import { ISignInReq } from '../../api/AuthApi';
import { authController } from '../../controllers/AuthController';

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

const submitBtn = new Button({
    title: 'Авторизоваться',
    className: 'sign-in-page__login-btn',
    type: 'submit',
});

const signUpLink = new Link({
    title: 'Нет аккаунта?',
    className: 'sign-in-page__sign-up-link',
    page: 'sign-up',
    url: '/sign-up',
});

const singInFormContent = new SignInFormContent({
    submitBtn,
    signUpLink,
    lists: [
        loginInput,
        passwordInput,
    ],
});

const signInForm = new Form({
    className: 'sign-in-page__form',
    events: {
        submit: async (e) => {
            e.preventDefault();
            const data = submitForm([loginInput, passwordInput]) as ISignInReq | null;
            if (data) {
                await authController.signIn(data);
            }
        },
    },
    formContent: singInFormContent,
});

interface SignInPageProps {
    signInForm: Form;
}

export class SignInPage extends Block<SignInPageProps> {
    constructor() {
        super({
            signInForm,
        });
    }

    render() {
        return SignInTemplate;
    }
}
