import { Button } from '../../common/Button';
import { Link } from '../../common/Link';
import { InputField } from '../../common/InputField';
import { Block } from '../../../utils/Block';
import SignUpFormContentTemplate from './SignUpFormContent.hbs?raw';

interface ISignUpFormContent {
    submitBtn: Button;
    signInLink: Link;
    lists: InputField[];
}
export class SignUpFormContent extends Block {
    constructor(props: ISignUpFormContent) {
        super(props);
    }

    render() {
        return SignUpFormContentTemplate;
    }
}
