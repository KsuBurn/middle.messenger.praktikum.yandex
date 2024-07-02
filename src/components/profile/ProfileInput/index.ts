import './ProfileInput.scss';
import { Block } from '../../../tools/Block';
import { InputField, InputFieldProps } from '../../common/InputField';
import ProfileInputTemplate from './ProfileInput.hbs?raw';

export class ProfileInput extends Block {
    constructor(props: InputFieldProps) {
        super({
            inputField: new InputField({
                className: 'profile-input',
                label: props.label,
                name: props.name,
                type: props.type,
                value: props.value,
            })
        });
    }

    render() {
        return ProfileInputTemplate;
    }
}
