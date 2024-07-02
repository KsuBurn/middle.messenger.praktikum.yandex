import './Button.scss';
import { Block } from '../../../tools/Block';
import ButtonTemplate from './Button.hbs?raw';

interface ButtonProps {
    title: string;
    className?: string;
    page?: string;
    buttonType?: string;
}
export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props)
    }

    override render() {
        return ButtonTemplate;
    }
}
