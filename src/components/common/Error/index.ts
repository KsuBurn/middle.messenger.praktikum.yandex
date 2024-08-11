import './Error.scss';
import { Block } from '../../../utils/Block';
import { Link } from '../Link';
import ErrorTemplate from './Error.hbs?raw';
import { Dialog } from '../Dialog';

interface IErrorPageProps {
    backLinkTitle: string;
    backLinkUrl: string;
    errorTitle: string;
    errorDescription: string;
}

export interface IErrorDialogContentProps {
    link?: Link;
}

interface IErrorProps {
    errorDialog: Dialog;
}

class ErrorDialogContent extends Block<IErrorDialogContentProps> {
    constructor(props: IErrorPageProps) {
        super({
            ...props,
            link: new Link({
                className: 'error-page__back-link',
                title: props.backLinkTitle,
                url: props.backLinkUrl,
            }),
        });
    }

    override render() {
        return ErrorTemplate;
    }
}

export class Error extends Block<IErrorProps> {
    constructor(props: IErrorPageProps) {
        super({
            ...props,
            errorDialog: new Dialog({
                className: 'dialog-container_error-page',
                showBackground: false,
                slot: new ErrorDialogContent(props),
            }),
        });
    }

    override render() {
        return '{{{errorDialog}}}';
    }
}
