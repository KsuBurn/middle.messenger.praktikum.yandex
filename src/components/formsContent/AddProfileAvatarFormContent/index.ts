import { Block } from '../../../utils/Block';
import { Button } from '../../common/Button';
import AddProfileAvatarFormContentTemplate from './AddProfileAvatarFormContent.hbs?raw';
import { FileInput } from '../../common/FileInput';

const addAvatarInput = new FileInput({
    label: 'Выбрать файл на компьютере',
    events: {},
});

interface IAddProfileAvatarFormContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addAvatarInput: typeof addAvatarInput;
    addAvatarBtn: Button;
    cancelBtn: Button;
}

export class AddProfileAvatarFormContent extends Block<IAddProfileAvatarFormContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void }) {
        super({
            ...props,
            addAvatarInput,
            addAvatarBtn: new Button({
                title: 'Добавить',
                type: 'submit',
            }),
            cancelBtn: new Button({
                title: 'Отмена',
                buttonType: 'outlined',
                type: 'button',
                events: {
                    click: (e) => {
                        props.handleOpenModal(e, 'dialog-container_add-profile-avatar-dialog');
                    },
                },
            }),
        });
    }

    render() {
        return AddProfileAvatarFormContentTemplate;
    }
}
