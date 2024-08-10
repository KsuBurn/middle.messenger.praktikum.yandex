import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import './DeleteUserFromChatDialog.scss';
import { DeleteUserFromChatFormContent } from '../../formsContent/DeleteUserFromChatFormContent';
import { chatsController } from '../../../controllers/ChatsController';
import { store } from '../../../store/Store';
import { IUser, userController } from '../../../controllers/UserController';

interface IDeleteUserFromChatDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    deleteUserFromChatDialogTemplate: Dialog;
}

interface IDeleteUserFromChatDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    deleteUserFromChatDialogForm: Form;
    error?: string;
}

class DeleteUserFromChatDialogContent extends Block<IDeleteUserFromChatDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            deleteUserFromChatDialogForm: new Form({
                className: 'delete-user-from-chat-dialog__form',
                formContent: new DeleteUserFromChatFormContent({
                    onCloseModal: (e) => {
                        const dialog = document.querySelector('.dialog-container_delete-user-from-chat-dialog');
                        const input = dialog?.querySelector('input');
                        input ? input.value = '' : null;
                        this.setProps({ ...this.props, error: ''});
                        props.handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog');
                    },
                }),
                events: {
                    submit: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const userLogin = (new FormData(e.target as HTMLFormElement)).get('user-name') as string;
                        const users = await userController.searchUserByLogin({ login: userLogin }) as IUser[];

                        if (users?.length) {
                            const user = users.find(item => item.login === userLogin);
                            if (user) {
                                await chatsController.removeUserFromChat({
                                    users: [user.id],
                                    chatId: store.getState().selectedChat?.id as number,
                                });
                                await props.handleOpenModal(e, 'dialog-container_delete-user-from-chat-dialog');
                            } else {
                                this.setProps({ ...this.props, error: 'Пользователь с таким логином не найден'});
                            }
                        } else {
                            this.setProps({ ...this.props, error: 'Пользователь с таким логином не найден'});
                        }
                    },
                },
            }),
        });
    }

    override render() {
        return `<main class="delete-user-from-chat-dialog">
                    <h4 class="delete-user-from-chat-dialog__title">Удалить пользователя из чата?</h4>
                    {{{ deleteUserFromChatDialogForm }}}
                    <span class="delete-user-from-chat-dialog__error">{{{ error }}}</span>
                 </main>`;
    }
}

export class DeleteUserFromChatDialog extends Block<IDeleteUserFromChatDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            deleteUserFromChatDialogTemplate: new Dialog({
                className: 'dialog-container_delete-user-from-chat-dialog dialog-container_hidden',
                slot: new DeleteUserFromChatDialogContent({ handleOpenModal: props.handleOpenModal }),
            }),
        });
    }

    override render() {
        return '{{{ deleteUserFromChatDialogTemplate }}}';
    }
}
