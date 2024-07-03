import './Input.scss';
import { Block } from '../../../utils/Block';
import InputTemplate from './Input.hbs?raw';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    events: Record<string, EventListenerOrEventListenerObject>
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return InputTemplate;
    }
}
