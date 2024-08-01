import { Block } from '../../../utils/Block';
import { Button } from '../../common/Button';
import AddProfileAvatarFormContentTemplate from './AddProfileAvatarFormContent.hbs?raw';
import { InputField } from '../../common/InputField';
import { FileInput } from '../../common/FileInput';

interface IAddProfileAvatarFormContentProps {
    handleOpenModal: (e: Event, elementClass: string) => void;
    addAvatarInput: InputField;
    addAvatarBtn: Button;
    cancelBtn: Button;
}

const addAvatarInput = new FileInput({
    label: 'Выбрать файл на компьютере',
    events: {},
});

const addAvatarBtn = new Button({
    title: 'Добавить',
    type: 'submit',
});

export class AddProfileAvatarFormContent extends Block<IAddProfileAvatarFormContentProps> {
    constructor(props: { handleOpenModal: (e: Event, elementClass: string) => void }) {
        super({
            ...props,
            addAvatarInput,
            addAvatarBtn,
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
