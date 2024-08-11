import './SignIn.scss';
import { Block } from '../../utils/Block';
import { Button, Form, InputField, Link } from '../../components';
import { SignInFormContent } from '../../components';
import { checkValidation, submitForm } from '../../utils/validation';
import { Fields } from '../../utils/validationRules';
import { ISignInReq } from '../../api/AuthApi';
import { authController } from '../../controllers/AuthController';
import { Dialog } from '../../components';

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
    className: 'sign-in-page-content__login-btn',
    type: 'submit',
});
const signUpLink = new Link({
    title: 'Нет аккаунта?',
    className: 'sign-in-page-content__sign-up-link',
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
    className: 'sign-in-page-content__form',
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

interface ISignInContentProps {
    signInForm: Form;
}

class SignInContent extends Block<ISignInContentProps> {
    constructor({ signInForm }: ISignInContentProps) {
        super({
            signInForm,
        });
    }

    override render() {
        return `<main class='sign-in-page-content'>{{{ signInForm }}}</main>`;
    }
}

export class SignInPage extends Block<{ signInPage: Dialog}> {
    constructor() {
        super({
            signInPage: new Dialog({
                className: 'dialog-container_sign-in-page',
                slot:  new SignInContent({ signInForm }),
                showBackground: false,
            }),
        });
    }

    override render() {
        return `<div class='sign-in-page'>{{{ signInPage }}}</div>`;
    }
}
