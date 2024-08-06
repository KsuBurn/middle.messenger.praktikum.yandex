import './FileInput.scss';
import FileInputTemplate from './FileInput.hbs?raw';
import { Block } from '../../../utils/Block';
import { store } from '../../../store/Store';
import { connect } from '../../../store/connect';
import { Indexed } from '../../../utils/types';
import { isEqual } from '../../../utils/isEqual';

interface IFileInputProps {
    label: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

class FileInputClass extends Block<IFileInputProps> {
    constructor(props: IFileInputProps) {
        super({
            ...props,
            events: {
                change: (e) => this.changeLabel(e)
            }
        });
    }

    protected changeLabel(e: any) {
        const selectedFile = e.target.files?.[0];

        store.set('profileAvatarForm.error', null);
        store.set('profileAvatarForm.selectedAvatarFile', selectedFile);
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
        if (!isEqual(oldProps, newProps)) {
            this.setProps({ ...this.props, label: newProps.selectedAvatarFile?.name || 'Выбрать файл на компьютере'});
        }
        return true;
    }

    override render() {
        return FileInputTemplate;
    }
}

const withProfileAvatarForm = connect(state => ({ ...state.profileAvatarForm}));
export const FileInput = withProfileAvatarForm(FileInputClass as typeof Block);
