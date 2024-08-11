import { Button } from '../../common/Button';
import { InputField } from '../../common/InputField';
import { Block } from '../../../utils/Block';
import ProfileFormContentTemplate from './ProfileFormContent.hbs?raw';
import { connect } from '../../../store/connect';
import { isEqual } from '../../../utils/isEqual';
import { Indexed } from '../../../utils/types';

interface IProfileFormContent {
    isDataChanging: boolean;
    isPasswordChanging: boolean;
    isSomeChanging: boolean;
    disabled: boolean;
    saveBtn: Button;
    changeDataBtn: Button;
    changePasswordBtn: Button;
    exitBtn: Button;
    oldPassInput: InputField;
    newPassInput: InputField;
    repeatedNewPassInput: InputField;
    emailInput: InputField;
    loginInput: InputField;
    nameInput: InputField;
    secondNameInput: InputField;
    chatNameInput: InputField;
    phoneInput: InputField;
}

export class ProfileFormContentClass extends Block<IProfileFormContent> {
    constructor(props: IProfileFormContent) {
        super(props);
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        const {
            oldPassInput,
            newPassInput,
            repeatedNewPassInput,
            emailInput,
            loginInput,
            nameInput,
            secondNameInput,
            chatNameInput,
            phoneInput,
        } = this.children;

        const dataFields = [
            emailInput,
            loginInput,
            nameInput,
            secondNameInput,
            chatNameInput,
            phoneInput,
        ];
        const passFields = [
            oldPassInput,
            newPassInput,
            repeatedNewPassInput,
        ];

        dataFields.map(item => item.setProps({ disabled: !newProps.isDataChanging}));
        passFields.map(item => item.setProps({ disabled: !newProps.isPasswordChanging}));

        if (!isEqual(oldProps, newProps)) {
            this.children.emailInput.setProps({ value: newProps.email });
            this.children.loginInput.setProps({ value: newProps.login });
            this.children.nameInput.setProps({ value: newProps.first_name });
            this.children.secondNameInput.setProps({ value: newProps.second_name });
            this.children.chatNameInput.setProps({ value: newProps.display_name });
            this.children.phoneInput.setProps({ value: newProps.phone });
        }
        return true;
    }

    override render() {
        return ProfileFormContentTemplate;
    }
}

const withUser = connect(state => ({ ...state.user, ...state.profileForm }));
export const ProfileFormContent = withUser(ProfileFormContentClass as typeof Block);
