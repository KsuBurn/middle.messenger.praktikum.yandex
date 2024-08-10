import { Block } from '../../../utils/Block';
import DeleteUserFromChatFormContentTemplate from './DeleteUserFromChatFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IDeleteUserFromChatFormContentProps {
    onCloseModal: (e: Event) => void;
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
    constructor(props: { onCloseModal: (e: Event) => void; }) {
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
                        props.onCloseModal(e);
                    },
                },
            }),
        });
    }

    render() {
        return DeleteUserFromChatFormContentTemplate;
    }
}
