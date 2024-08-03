import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import { ChatDeleteFormContent } from '../../formsContent/ChatDeleteFormContent';
import './ChatDeleteDialog.scss';
import { chatsController } from '../../../controllers/ChatsController';

interface IChatDeleteDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatDeleteDialogTemplate: Dialog;
}

interface IChatDeleteDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatDeleteDialogForm: Form;
}

class ChatDeleteDialogContent extends Block<IChatDeleteDialogContentProps> {
    constructor(props: {handleOpenModal: (e: Event, elementClass: string) => void}) {
        super({
            ...props,
            chatDeleteDialogForm: new Form({
                className: 'chat-delete-dialog__form',
                formContent: new ChatDeleteFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        await chatsController.deleteChat('');
                        await props.handleOpenModal(e, 'dialog-container_create-chat-dialog')
                    },
                }
            })
        });
    }

    override render() {
        return `<main class="chat-delete-dialog">
                    <h4 class="chat-delete-dialog__title">Удалить чат?</h4>
                    {{{ chatDeleteDialogForm }}}
                </main>`
    }
}

export class ChatDeleteDialog extends Block<IChatDeleteDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            chatDeleteDialogTemplate: new Dialog({
                className: 'dialog-container_delete-chat-dialog dialog-container_hidden',
                slot: new ChatDeleteDialogContent({ handleOpenModal: props.handleOpenModal }),
            })
        });
    }

    override render() {
        return `{{{ chatDeleteDialogTemplate }}}`
    }
}
