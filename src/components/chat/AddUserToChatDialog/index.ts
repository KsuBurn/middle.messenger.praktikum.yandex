import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import './AddUserToChatDialog.scss';
import { AddUserToChatFormContent } from '../../formsContent/AddUserToChatFormContent';
import { chatsController } from '../../../controllers/ChatsController';
import { store } from '../../../store/Store';

interface IAddUserToChatDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addUserToChatDialogTemplate: Dialog;
}

interface IAddUserToChatDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addUserToChatDialogForm: Form;
}

class AddUserToChatDialogContent extends Block<IAddUserToChatDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            addUserToChatDialogForm: new Form({
                className: 'add-user-to-chat-dialog__form',
                formContent: new AddUserToChatFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const userLogin = (new FormData(e.target as HTMLFormElement)).get('user-name') as string;
                        await chatsController.addUserToChat({
                            userLogin,
                            chatId: store.getState().selectedChat?.id as number,
                        });
                        await props.handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog');
                    },
                },
            }),
        });
    }

    override render() {
        return `<main class="add-user-to-chat-dialog">
                    <h4 class="chat-delete-dialog__title">Добавить пользователя в чат?</h4>
                    {{{ addUserToChatDialogForm }}}
                </main>`;
    }
}

export class AddUserToChatDialog extends Block<IAddUserToChatDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            addUserToChatDialogTemplate: new Dialog({
                className: 'dialog-container_add-user-to-chat-dialog dialog-container_hidden',
                slot: new AddUserToChatDialogContent({ handleOpenModal: props.handleOpenModal }),
            }),
        });
    }

    override render() {
        return '{{{ addUserToChatDialogTemplate }}}';
    }
}
