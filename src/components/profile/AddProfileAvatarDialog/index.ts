import { Block } from '../../../utils/Block';
import { Dialog } from '../../common/Dialog';
import { Form } from '../../common/Form';
import { AddProfileAvatarFormContent } from '../../formsContent/AddProfileAvatarFormContent';
import './AddProfileAvatarDialog.scss';
import { userController } from '../../../controllers/UserController';
import { store } from '../../../store/Store';
import { connect } from '../../../store/connect';

interface IAddProfileAvatarDialogProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addProfileAvatarDialogTemplate: Dialog;
}

interface IAddProfileAvatarDialogContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addProfileAvatarDialogForm: Form;
    error?: string;
}

class AddProfileAvatarDialogContentClass extends Block<IAddProfileAvatarDialogContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void; }) {
        super({
            ...props,
            addProfileAvatarDialogForm: new Form({
                className: 'add-profile-avatar-dialog__form',
                formContent: new AddProfileAvatarFormContent({ handleOpenModal: props.handleOpenModal }),
                events: {
                    submit: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const selectedFile = store.getState().profileAvatarForm.selectedAvatarFile;
                        if (!selectedFile) {
                            store.set('profileAvatarForm.error', 'Нужно выбрать файл');
                            return;
                        }
                        const formData = new FormData();
                        formData.append('avatar', selectedFile);
                        await userController.setAvatar(formData);
                        props.handleOpenModal(e, 'dialog-container_add-profile-avatar-dialog');
                    },
                },
            }),
        });
    }

    override render() {
        return `<main class="add-profile-avatar-dialog">
                    <h4 class="add-profile-avatar-dialog__title">Загрузите файл</h4>
                    {{{addProfileAvatarDialogForm}}}
                    <span class="add-profile-avatar-dialog__error">{{{error}}}</span>
                </main>`;
    }
}

const withProfileAvatarForm = connect(state => ({ ...state.profileAvatarForm}));
const AddProfileAvatarDialogContent = withProfileAvatarForm(AddProfileAvatarDialogContentClass as typeof Block);

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
        return '{{{ addProfileAvatarDialogTemplate }}}';
    }
}
