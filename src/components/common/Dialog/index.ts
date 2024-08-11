import './Dialog.scss';
import { Block } from '../../../utils/Block';
import DialogTemplate from './Dialog.hbs?raw';

interface IDialogProps {
    slot: unknown;
    className: string;
    showBackground?: boolean;
}

export class Dialog extends Block<IDialogProps> {
    constructor(props: IDialogProps) {
        super({
            showBackground: true,
            ...props,
        });
    }

    override render() {
        return DialogTemplate;
    }
}
