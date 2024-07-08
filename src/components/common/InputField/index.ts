import './InputField.scss';
import { Block } from '../../../utils/Block';
import InputFieldTemplate from './InputField.hbs?raw';
import { Input } from '../Input';

export interface InputFieldProps {
    className?: string;
    label?: string;
    type: string;
    name: string;
    placeholder?: string;
    events: Record<string, EventListenerOrEventListenerObject>
    input?: Input;
    error?: string;
}
export class InputField extends Block<InputFieldProps> {
    constructor(props: InputFieldProps) {
        super({
            ...props,
            input: new Input({
                type: props.type,
                name: props.name,
                placeholder: props.placeholder,
                events: props.events,
            }),
        });
    }

    render() {
        return InputFieldTemplate;
    }
}
