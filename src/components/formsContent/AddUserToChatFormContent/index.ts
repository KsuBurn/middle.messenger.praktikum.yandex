import { Block } from '../../../utils/Block';
import AddUserToChatFormContentTemplate from './AddUserToChatFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IAddUserToChatFormContentProps {
    onCloseModal: (e: Event, ) => void;
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
    constructor(props: { onCloseModal: (e: Event, ) => void }) {
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
                        props.onCloseModal(e);
                    },
                },
            }),
        });
    }

    render() {
        return AddUserToChatFormContentTemplate;
    }
}
