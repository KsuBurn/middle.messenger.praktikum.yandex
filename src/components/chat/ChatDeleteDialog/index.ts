import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import './ChatDeleteDialog.scss';
import { chatsController } from '../../../controllers/ChatsController';
import { Button } from '../../common/Button';
import { store } from '../../../store/Store';

interface IChatDeleteDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    chatDeleteDialogTemplate: Dialog;
}

interface IChatDeleteDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    deleteChatBtn: Button;
    cancelBtn: Button;
}

class ChatDeleteDialogContent extends Block<IChatDeleteDialogContentProps> {
    constructor(props: {handleOpenModal: (e: Event, elementClass: string) => void}) {
        super({
            ...props,
            deleteChatBtn: new Button({
                title: 'Удалить',
                type: 'button',
                events: {
                    click: async (e) => {
                        const chatId = store.getState().selectedChat?.id;
                        if (chatId) {
                            await chatsController.deleteChat({ chatId });
                        }
                        props.handleOpenModal(e, 'dialog-container_delete-chat-dialog');
                    },
                },
            }),
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

    override render() {
        return `<main class="chat-delete-dialog">
                    <h4 class="chat-delete-dialog__title">Удалить чат?</h4>
                    <div class="chat-delete-dialog__actions">
                        {{{ deleteChatBtn }}}
                        {{{ cancelBtn }}}
                    </div>
                </main>`;
    }
}

export class ChatDeleteDialog extends Block<IChatDeleteDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            chatDeleteDialogTemplate: new Dialog({
                className: 'dialog-container_delete-chat-dialog dialog-container_hidden',
                slot: new ChatDeleteDialogContent({ handleOpenModal: props.handleOpenModal }),
            }),
        });
    }

    override render() {
        return '{{{ chatDeleteDialogTemplate }}}';
    }
}
