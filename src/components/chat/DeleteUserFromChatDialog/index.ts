import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import './DeleteUserFromChatDialog.scss';
import { DeleteUserFromChatFormContent } from '../../formsContent/DeleteUserFromChatFormContent';
import { chatsController } from '../../../controllers/ChatsController';

interface IDeleteUserFromChatDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    deleteUserFromChatDialogTemplate: Dialog;
}

interface IDeleteUserFromChatDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    deleteUserFromChatDialogForm: Form;
}

class DeleteUserFromChatDialogContent extends Block<IDeleteUserFromChatDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            deleteUserFromChatDialogForm: new Form({
                className: 'delete-user-from-chat-dialog__form',
                formContent: new DeleteUserFromChatFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        await chatsController.removeUserFromChat({});
                        await props.handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog')
                    },
                }
            })
        });
    }

    override render() {
        return `<main class="delete-user-from-chat-dialog">
                    <h4 class="delete-user-from-chat-dialog__title">Удалить пользователя из чата?</h4>
                    {{{ deleteUserFromChatDialogForm }}}
                </main>`
    }
}

export class DeleteUserFromChatDialog extends Block<IDeleteUserFromChatDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            deleteUserFromChatDialogTemplate: new Dialog({
                className: 'dialog-container_delete-user-from-chat-dialog dialog-container_hidden',
                slot: new DeleteUserFromChatDialogContent({ handleOpenModal: props.handleOpenModal }),
            })
        });
    }

    override render() {
        return `{{{ deleteUserFromChatDialogTemplate }}}`
    }
}
