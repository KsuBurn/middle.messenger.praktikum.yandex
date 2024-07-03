import { Button } from '../../common/Button';
import { InputField } from '../../common/InputField';
import { Block } from '../../../utils/Block';
import ProfileFormContentTemplate from './ProfileFormContent.hbs?raw';

interface IProfileFormContent {
    isDataChanging: boolean;
    isPasswordChanging: boolean;
    isSomeChanging: boolean;
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
export class ProfileFormContent extends Block {
    constructor(props: IProfileFormContent) {
        super(props);
    }

    render() {
        return ProfileFormContentTemplate;
    }
}
