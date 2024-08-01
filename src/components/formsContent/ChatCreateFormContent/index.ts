import { Block } from '../../../utils/Block';
import ChatCreateFormContentTemplate from './ChatCreateFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IChatCreateFormContent {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatNameInput: InputField;
    createNewChatBtn: Button;
    cancelBtn: Button;
}

const chatNameInput = new InputField({
    label: 'Название чата',
    type: 'text',
    name: 'chat-name',
    events: {},
});

const createNewChatBtn = new Button({
    title: 'Создать',
    type: 'submit',
});

export class ChatCreateFormContent extends Block<IChatCreateFormContent> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            chatNameInput,
            createNewChatBtn,
            cancelBtn: new Button({
                title: 'Отмена',
                buttonType: 'outlined',
                type: 'button',
                events: {
                    click: (e) => {
                        props.handleOpenModal(e, 'dialog-container_create-chat-dialog');
                    },
                },
            }),
        });
    }

    render() {
        return ChatCreateFormContentTemplate;
    }
}
