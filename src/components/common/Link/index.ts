import './Link.scss';
import LinkTemplate from './Link.hbs?raw';
import { Block } from '../../../utils/Block';

interface ILinkProps {
    title: string;
    url: string;
    className?: string;
    endIcon?: string;
}
export class Link extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super(props);
    }

    render() {
        return LinkTemplate;
    }
}
