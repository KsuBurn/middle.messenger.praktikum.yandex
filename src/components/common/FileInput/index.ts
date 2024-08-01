import './FileInput.scss';
import FileInputTemplate from './FileInput.hbs?raw';
import { Block } from '../../../utils/Block';

interface IFileInputProps {
    label: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class FileInput extends Block<IFileInputProps> {
    constructor(props: IFileInputProps) {
        super({
            ...props,
            events: {
                change: () => this.changeLabel()
            }
        });
        this.changeLabel();
    }

    public getFile() {
        const fileInput = document.querySelector('.file-input__input') as HTMLInputElement | undefined;
        if (fileInput) {
            const selectedFile = fileInput.files?.[0];

            return selectedFile;
        }

        return null
    }

    private _fileName() {
        const selectedFile = this.getFile();
        if (!selectedFile) {
            return 'Выберите файл';
        }
        return selectedFile.name;
    }

    protected changeLabel() {
        this.setProps({
            ...this.props,
            label: this._fileName(),
        });
    }

    override render() {
        return FileInputTemplate;
    }
}
