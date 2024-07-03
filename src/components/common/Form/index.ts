import FormTemplate from './Form.hbs?raw';
import { Block } from '../../../utils/Block';

interface IForm {
    className?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    formContent: Block | Block[];
}
export class Form extends Block {
    constructor(props: IForm) {
        super(props);
    }

    render() {
        return FormTemplate;
    }
}
