import FormTemplate from './Form.hbs?raw';
import { Block } from '../../../utils/Block';
import { SignInFormContent } from '../../formsContent/SignInFormContent';
import { ProfileFormContent } from '../../formsContent/ProfileFormContent';
import { SignUpFormContent } from '../../formsContent/SignUpFormContent';

interface IForm {
    className?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    formContent: SignInFormContent | ProfileFormContent | SignUpFormContent;
}

export class Form extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    render() {
        return FormTemplate;
    }
}
