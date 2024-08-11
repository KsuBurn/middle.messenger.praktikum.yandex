import './Button.scss';
import { Block } from '../../../utils/Block';
import ButtonTemplate from './Button.hbs?raw';

interface IButtonProps {
    title: string;
    className?: string;
    page?: string;
    buttonType?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    type?: string;
}

export class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    override render() {
        return ButtonTemplate;
    }
}
