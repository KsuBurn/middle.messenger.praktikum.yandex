import './Link.scss';
import LinkTemplate from './Link.hbs?raw';
import { Block } from '../../../utils/Block';

interface LinkProps {
    title: string;
    url: string;
    className?: string;
    endIcon?: string;
}
export class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return LinkTemplate;
    }
}
