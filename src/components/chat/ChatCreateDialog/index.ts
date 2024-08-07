import './ChatCreateDialog.scss';
import { Block } from '../../../utils/Block';
import { Form } from '../../common/Form';
import { ChatCreateFormContent } from '../../formsContent/ChatCreateFormContent';
import { Dialog } from '../../common/Dialog';
import { chatsController } from '../../../controllers/ChatsController';

interface IChatCreateDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatCreateDialogContent: Dialog;
}

interface IChatCreateDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatCreateDialogForm: Form;
}

class ChatCreateDialogContent extends Block<IChatCreateDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            chatCreateDialogForm: new Form({
                className: 'chat-create-dialog__form',
                formContent: new ChatCreateFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await chatsController.createChat({ title: (e.target as HTMLElement)?.querySelectorAll('input')[0].value});
                        await props.handleOpenModal(e, 'dialog-container_create-chat-dialog');
                    },
                },
            }),
        });
    }

    override render() {
        return `<main class="chat-create-dialog">
                    <h4 class="chat-create-dialog__title">Создать новый чат</h4>
                    {{{ chatCreateDialogForm }}}
                </main>`;
    }
}

export class ChatCreateDialog extends Block<IChatCreateDialogProps> {
    constructor(props: {     handleOpenModal: (e: Event, elementClass: string) => void }) {
        super({
            ...props,
            chatCreateDialogContent: new Dialog({
                className: 'dialog-container_create-chat-dialog dialog-container_hidden',
                slot: new ChatCreateDialogContent({ handleOpenModal: props.handleOpenModal }),
            }),
        });
    }

    render() {
        return '{{{ chatCreateDialogContent }}}';
    }
}
