import { Block } from '../../../utils/Block';
import ChatDeleteFormContentTemplate from './ChatDeleteFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { Button } from '../../common/Button';

interface IChatDeleteFormContent {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatNameInput: InputField;
    deleteChatBtn: Button;
    cancelBtn: Button;
}

const chatNameInput = new InputField({
    label: 'Название чата',
    type: 'text',
    name: 'chat-name',
    events: {},
});

const deleteChatBtn = new Button({
    title: 'Удалить',
    type: 'submit',
});

export class ChatDeleteFormContent extends Block<IChatDeleteFormContent> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            chatNameInput,
            deleteChatBtn,
            cancelBtn: new Button({
                title: 'Отмена',
                buttonType: 'outlined',
                type: 'button',
                events: {
                    click: (e) => {
                        props.handleOpenModal(e, 'dialog-container_delete-chat-dialog');
                    },
                },
            }),
        });
    }

    render() {
        return ChatDeleteFormContentTemplate;
    }
}
