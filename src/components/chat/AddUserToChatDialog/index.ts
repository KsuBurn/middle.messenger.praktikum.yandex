import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import './AddUserToChatDialog.scss';
import { AddUserToChatFormContent } from '../../formsContent/AddUserToChatFormContent';
import { chatsController } from '../../../controllers/ChatsController';
import { store } from '../../../store/Store';
import { IUser, userController } from '../../../controllers/UserController';

interface IAddUserToChatDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addUserToChatDialogTemplate: Dialog;
}

interface IAddUserToChatDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addUserToChatDialogForm: Form;
    error?: string;
}

class AddUserToChatDialogContent extends Block<IAddUserToChatDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            addUserToChatDialogForm: new Form({
                className: 'add-user-to-chat-dialog__form',
                formContent: new AddUserToChatFormContent({
                    onCloseModal: (e) => {
                        const dialog = document.querySelector('.dialog-container_add-user-to-chat-dialog');
                        const input = dialog?.querySelector('input');
                        input ? input.value = '' : null;
                        this.setProps({ ...this.props, error: ''});
                        props.handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog');
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
                                await chatsController.addUserToChat({
                                    users: [user.id],
                                    chatId: store.getState().selectedChat?.id as number,
                                });
                                await props.handleOpenModal(e, 'dialog-container_add-user-to-chat-dialog');
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
        return `<main class="add-user-to-chat-dialog">
                    <h4 class="chat-delete-dialog__title">Добавить пользователя в чат?</h4>
                    {{{ addUserToChatDialogForm }}}
                    <span class="add-user-to-chat-dialog__error">{{{ error }}}</span>
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
