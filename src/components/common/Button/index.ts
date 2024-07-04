import './Button.scss';
import { Block } from '../../../utils/Block';
import ButtonTemplate from './Button.hbs?raw';

interface ButtonProps {
    title: string;
    className?: string;
    page?: string;
    buttonType?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    type?: string;
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    override render() {
        return ButtonTemplate;
    }
}
