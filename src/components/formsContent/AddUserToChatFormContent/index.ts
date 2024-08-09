import { Block } from '../../../utils/Block';
import AddUserToChatFormContentTemplate from './AddUserToChatFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IAddUserToChatFormContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    userNameInput: InputField;
    addUserBtn: Button;
    cancelBtn: Button;
}

const userNameInput = new InputField({
    label: 'Логин',
    type: 'text',
    name: 'user-name',
    events: {},
});

const addUserBtn = new Button({
    title: 'Добавить',
    type: 'submit',
});

export class AddUserToChatFormContent extends Block<IAddUserToChatFormContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void }) {
        super({
            ...props,
            userNameInput,
            addUserBtn,
            cancelBtn: new Button({
                title: 'Отмена',
                buttonType: 'outlined',
                type: 'button',
                events: {
                    click: (e) => {
                        const dialog = document.querySelector('.dialog-container_add-user-to-chat-dialog');
                        const input = dialog?.querySelector('input');
                        input ? input.value = '' : null;
                        props.handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog');
                    },
                },
            }),
        });
    }

    render() {
        return AddUserToChatFormContentTemplate;
    }
}
