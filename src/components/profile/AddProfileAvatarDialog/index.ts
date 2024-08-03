import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import { AddProfileAvatarFormContent } from '../../formsContent/AddProfileAvatarFormContent';
import './AddProfileAvatarDialog.scss';
import { authController } from '../../../controllers/AuthController';
import { userController } from '../../../controllers/UserController';

interface IAddProfileAvatarDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addProfileAvatarDialogTemplate: Dialog;
}

interface IAddProfileAvatarDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addProfileAvatarDialogForm: Form;
}

class AddProfileAvatarDialogContent extends Block<IAddProfileAvatarDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            addProfileAvatarDialogForm: new Form({
                className: 'add-profile-avatar-dialog__form',
                formContent: new AddProfileAvatarFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        await userController.setAvatar({})
                        props.handleOpenModal(e, 'dialog-container_add-profile-avatar-dialog')
                    },
                }
            })
        });
    }

    override render() {
        return `<main class="add-profile-avatar-dialog">
                    <h4 class="add-profile-avatar-dialog__title">Загрузите файл</h4>
                    {{{ addProfileAvatarDialogForm }}}
                </main>`
    }
}

export class AddProfileAvatarDialog extends Block<IAddProfileAvatarDialogProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void }) {
        super({
            ...props,
            addProfileAvatarDialogTemplate: new Dialog({
                className: 'dialog-container_add-profile-avatar-dialog dialog-container_hidden',
                slot: new AddProfileAvatarDialogContent({ handleOpenModal: props.handleOpenModal }),
            }),
        });
    }

    render() {
        return `{{{ addProfileAvatarDialogTemplate }}}`;
    }
}
