import FormTemplate from './Form.hbs?raw';
import { Block } from '../../../utils/Block';
import { SignInFormContent } from '../../formsContent/SignInFormContent';
import { ProfileFormContent } from '../../formsContent/ProfileFormContent';
import { SignUpFormContent } from '../../formsContent/SignUpFormContent';
import { ChatCreateFormContent } from '../../formsContent/ChatCreateFormContent';
import { ChatDeleteFormContent } from '../../formsContent/ChatDeleteFormContent';
import { AddUserToChatFormContent } from '../../formsContent/AddUserToChatFormContent';
import { DeleteUserFromChatFormContent } from '../../formsContent/DeleteUserFromChatFormContent';
import { AddProfileAvatarFormContent } from '../../formsContent/AddProfileAvatarFormContent';

interface IForm {
    className?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    formContent: SignInFormContent |
        ProfileFormContent |
        SignUpFormContent |
        ChatCreateFormContent |
        ChatDeleteFormContent |
        AddUserToChatFormContent |
        DeleteUserFromChatFormContent |
        AddProfileAvatarFormContent;
}

export class Form extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    render() {
        return FormTemplate;
    }
}
