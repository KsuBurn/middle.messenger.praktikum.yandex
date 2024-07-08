import './Error.scss';
import { Block } from '../../../utils/Block';
import { Link } from '../Link';
import ErrorTemplate from './Error.hbs?raw';

export interface ErrorProps {
    backLinkTitle: string;
    backLinkUrl: string;
    page: string;
    errorTitle: string;
    errorDescription: string;
    link?: Link;
}

export class Error extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super({
            ...props,
            link: new Link({
                className: 'error-page__back-link',
                title: props.backLinkTitle,
                url: props.backLinkUrl,
                page: props.page,
            }),
        });
    }

    render() {
        return ErrorTemplate;
    }
}
