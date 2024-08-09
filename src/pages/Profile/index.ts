import './Profile.scss';
import { Block } from '../../utils/Block';
import { Form, InputField } from '../../components';
import { IconButton } from '../../components';
import { Button } from '../../components';
import ProfileTemplate from './Profile.hbs?raw';
import { checkValidation, isPasswordsEqual, submitForm } from '../../utils/validation';
import { ProfileFormContent } from '../../components';
import { Fields } from '../../utils/validationRules';
import { router } from '../../router/Router';
import { authController } from '../../controllers/AuthController';
import { AddProfileAvatarDialog } from '../../components/profile/AddProfileAvatarDialog';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { userController } from '../../controllers/UserController';
import { connect } from '../../store/connect';
import { IPassword, IProfileData } from '../../api/UserApi';
import { store } from '../../store/Store';
import { handleOpenModal } from '../../utils/habdleOpenModal';
import { PagesUrls } from '../../router/types';

const oldPassInput = new InputField({
    className: 'profile-input',
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
    value: '',
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
            isPasswordsEqual(newPassInput.props.value || '', element.value, repeatedNewPassInput);
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
            store.set('profileForm', {
                isDataChanging: true,
                isSomeChanging: true,
                isPasswordChanging: false,
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
            store.set('profileForm', {
                isPasswordChanging: true,
                isSomeChanging: true,
                isDataChanging: false,
            });
        },
    },
});
const saveBtn = new Button({
    title: 'Сохранить',
    className: 'profile__save-btn',
    type: 'submit',
});
const exitBtn = new Button({
    title: 'Выйти',
    className: 'profile__exit-button',
    page: 'sign-in',
    buttonType: 'outlined',
    type: 'button',
    events: {
        click: async () => {
            await authController.logout();
        },
    },
});
const profileFormContent = new ProfileFormContent({
    saveBtn,
    exitBtn,
    changeDataBtn,
    changePasswordBtn,
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
        submit: async (e) => {
            e.preventDefault();
            if (profileFormContent.props.isPasswordChanging) {
                const data = submitForm([
                    oldPassInput,
                    newPassInput,
                    repeatedNewPassInput,
                ]);
                const isEqual = isPasswordsEqual(newPassInput.props.value || '', repeatedNewPassInput.props.value || '', repeatedNewPassInput);
                if (data && isEqual) {
                    await userController.changePassword(data as IPassword);
                    store.set('profileForm', {
                        isPasswordChanging: false,
                        isSomeChanging: false,
                        isDataChanging: false,
                    });
                }
            } else {
                const data = submitForm([
                    emailInput,
                    loginInput,
                    nameInput,
                    secondNameInput,
                    chatNameInput,
                    phoneInput,
                ]);
                if (data) {
                    await userController.setProfileData(data as IProfileData);
                    store.set('profileForm', {
                        isPasswordChanging: false,
                        isSomeChanging: false,
                        isDataChanging: false,
                    });
                }
            }
        },
    },
});

const addProfileAvatarDialog = new AddProfileAvatarDialog({ handleOpenModal });

const profileAvatar = new ProfileAvatar({
    events: {
        click: (e: Event) => {
            store.set('profileAvatarForm', { selectedAvatarFile: null, error: null });
            handleOpenModal(e, 'dialog-container_add-profile-avatar-dialog');
        },
    },
});

interface IProfilePageProps {
    profileForm: Form;
    backBtn: IconButton;
    addProfileAvatarDialog: AddProfileAvatarDialog;
    profileAvatar: typeof profileAvatar;
}

class ProfilePageBlock extends Block<IProfilePageProps> {
    constructor() {
        super({
            profileForm,
            addProfileAvatarDialog,
            profileAvatar,
            backBtn: new IconButton({
                src: '../../assets/arrowRight.svg',
                alt: 'Кнопка назад',
                type: 'button',
                events: {
                    click: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.go(PagesUrls.CHAT);
                    },
                },
            }),
        });

        authController.getUser();
    }

    render() {
        return ProfileTemplate;
    }
}

const withUser = connect(state => ({ user: state.user }));
export const ProfilePage = withUser(ProfilePageBlock as typeof Block);
