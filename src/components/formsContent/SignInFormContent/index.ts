import SignInFormContentTemplate from './SignInFormContent.hbs?raw';
import { Block } from '../../../utils/Block';
import { Button } from '../../common/Button';
import { Link } from '../../common/Link';
import { InputField } from '../../common/InputField';

interface ISignInFormContent {
    submitBtn: Button;
    signUpLink: Link;
    lists: InputField[];
}
export class SignInFormContent extends Block {
    constructor(props: ISignInFormContent) {
        super(props);
    }

    render() {
        return SignInFormContentTemplate;
    }
}
