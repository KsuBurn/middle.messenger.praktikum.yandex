import './InputField.scss';
import { Block } from '../../../utils/Block';
import InputFieldTemplate from './InputField.hbs?raw';
import { Input } from '../Input';
import { isEqual } from '../../../utils/isEqual';
import { Indexed } from '../../../utils/types';

export interface IInputFieldProps {
    className?: string;
    label?: string;
    type: string;
    name: string;
    placeholder?: string;
    events: Record<string, EventListenerOrEventListenerObject>
    input?: Input;
    error?: string;
    value?: string;
    disabled?: boolean;
}
export class InputField extends Block<IInputFieldProps> {
    constructor(props: IInputFieldProps) {
        super({
            ...props,
            input: new Input({
                type: props.type,
                name: props.name,
                placeholder: props.placeholder,
                events: props.events,
                value: props.value,
                disabled: props.disabled,
            }),
        });
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed) {
        if (!isEqual(oldProps, newProps)) {
            this.children.input.setProps(newProps);
        }
        return true;
    }

    override render() {
        return InputFieldTemplate;
    }
}
