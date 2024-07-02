import './InputField.scss';
import { Block } from '../../../tools/Block';
import InputFieldTemplate from './InputField.hbs?raw';

export interface InputFieldProps {
    className?: string;
    label?: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
}
export class InputField extends Block {
    constructor(props: InputFieldProps) {
        super(props)
    }

    render() {
        return InputFieldTemplate;
    }
}
