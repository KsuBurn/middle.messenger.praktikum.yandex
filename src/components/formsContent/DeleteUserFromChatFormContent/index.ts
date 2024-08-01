import { Block } from '../../../utils/Block';
import DeleteUserFromChatFormContentTemplate from './DeleteUserFromChatFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IDeleteUserFromChatFormContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    userNameInput: InputField;
    deleteUserBtn: Button;
    cancelBtn: Button;
}

const userNameInput = new InputField({
    label: 'Логин',
    type: 'text',
    name: 'user-name',
    events: {},
});

const deleteUserBtn = new Button({
    title: 'Удалить',
    type: 'submit',
});

export class DeleteUserFromChatFormContent extends Block<IDeleteUserFromChatFormContentProps> {
    constructor(props: {handleOpenModal: (e: Event, elementClass: string) => void;}) {
        super({
            ...props,
            userNameInput,
            deleteUserBtn,
            cancelBtn: new Button({
                title: 'Отмена',
                buttonType: 'outlined',
                type: 'button',
                events: {
                    click: (e) => {
                        this.props.handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog');
                    },
                },
            }),
        });
    }

    render() {
        return DeleteUserFromChatFormContentTemplate;
    }
}
