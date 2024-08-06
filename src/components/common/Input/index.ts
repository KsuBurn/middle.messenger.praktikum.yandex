import './Input.scss';
import { Block } from '../../../utils/Block';
import InputTemplate from './Input.hbs?raw';
import { Indexed } from '../../../utils/types';
import { isEqual } from '../../../utils/isEqual';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    events: Record<string, EventListenerOrEventListenerObject>;
    value?: string;
    disabled?: boolean;
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({
            ...props,
        });
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        if (!isEqual(oldProps, newProps)) {
            this.setProps(newProps as InputProps);
        }
        return true;
    }

    override render() {
        return InputTemplate;
    }
}
