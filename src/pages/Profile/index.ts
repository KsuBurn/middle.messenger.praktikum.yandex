import './Profile.scss';
import { Block } from '../../utils/Block';
import { Form, InputField } from '../../components';
import { IconButton } from '../../components';
import { Button } from '../../components';
import ProfileTemplate from './Profile.hbs?raw';
import { checkValidation, submitForm } from '../../utils/validation';
import { ProfileFormContent } from '../../components';
import { Fields } from '../../utils/validationRules';

const oldPassInput = new InputField({
    className: 'profile-input',
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, oldPassInput);
        },
    },
});
const newPassInput = new InputField({
    className: 'profile-input',
    label: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, newPassInput);
        },
    },
});
const repeatedNewPassInput = new InputField({
    className: 'profile-input',
    label: 'Повторите новый пароль',
    name: 'newPassword',
    type: 'password',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, repeatedNewPassInput);
        },
    },
});
const emailInput = new InputField({
    className: 'profile-input',
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
    className: 'profile-input',
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
    className: 'profile-input',
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
    className: 'profile-input',
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
const chatNameInput = new InputField({
    className: 'profile-input',
    label: 'Имя в чате',
    type: 'text',
    name: 'display_name',
    events: {
        blur: (e: Event) => {
            const element =  e.target as HTMLInputElement;
            checkValidation(element.name as Fields, element.value, chatNameInput);
        },
    },
});
const phoneInput = new InputField({
    className: 'profile-input',
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
const changeDataBtn = new Button({
    title: 'Изменить данные',
    buttonType: 'outlined',
    type: 'button',
    events: {
        click: () => {
            profileFormContent.setProps({
                isDataChanging: true,
                isSomeChanging: true,
            });
        },
    },
});
const changePasswordBtn = new Button({
    title: 'Изменить пароль',
    buttonType: 'outlined',
    type: 'button',
    events: {
        click: () => {
            profileFormContent.setProps({
                isPasswordChanging: true,
                isSomeChanging: true,
            });
        },
    },
});

const profileFormContent = new ProfileFormContent({
    isDataChanging: false,
    isPasswordChanging: false,
    isSomeChanging: false,
    saveBtn: new Button({
        title: 'Сохранить',
        className: 'profile__save-btn',
        type: 'submit',
    }),
    changeDataBtn,
    changePasswordBtn,
    exitBtn: new Button({
        title: 'Выйти',
        className: 'profile__exit-button',
        page: 'sign-in',
        buttonType: 'outlined',
        type: 'button',
    }),
    oldPassInput,
    newPassInput,
    repeatedNewPassInput,
    emailInput,
    loginInput,
    nameInput,
    secondNameInput,
    chatNameInput,
    phoneInput,
});

const profileForm = new Form({
    className: 'profile__form',
    formContent: profileFormContent,
    events: {
        submit: (e) => {
            e.preventDefault();
            if (profileFormContent.props.isPasswordChanging) {
                submitForm([
                    oldPassInput,
                    newPassInput,
                    repeatedNewPassInput,
                ]);
            } else {
                submitForm([
                    emailInput,
                    loginInput,
                    nameInput,
                    secondNameInput,
                    chatNameInput,
                    phoneInput,
                ]);
            }
        },
    },
});

export class ProfilePage extends Block {
    constructor() {
        super({
            profileForm,
            backBtn: new IconButton({
                src: '../../assets/arrowRight.svg',
                alt: 'Кнопка назад',
                page: 'chat',
            }),
        });
    }

    render() {
        return ProfileTemplate;
    }
}
