import FormTemplate from './Form.hbs?raw';
import { Block } from '../../../utils/Block';
import { AddProfileAvatarFormContent } from '../../formsContent/AddProfileAvatarFormContent';
import { SignUpFormContent } from '../../formsContent/SignUpFormContent';
import { AddUserToChatFormContent } from '../../formsContent/AddUserToChatFormContent';
import { ChatCreateFormContent } from '../../formsContent/ChatCreateFormContent';
import { DeleteUserFromChatFormContent } from '../../formsContent/DeleteUserFromChatFormContent';
import { SignInFormContent } from '../../formsContent/SignInFormContent';

interface IForm {
    className?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    formContent:
        Block |
        AddProfileAvatarFormContent |
        SignUpFormContent |
        AddUserToChatFormContent |
        ChatCreateFormContent |
        DeleteUserFromChatFormContent |
        SignInFormContent;
}

export class Form extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    render() {
        return FormTemplate;
    }
}
