import './Link.scss';
import LinkTemplate from './Link.hbs?raw';
import { Block } from '../../../tools/Block';

interface LinkProps {
    title: string;
    url: string;
    className?: string;
    page: string;
    endIcon?: string;
}
export class Link extends Block {
    constructor(props: LinkProps) {
        super(props)
    }

    render() {
        return LinkTemplate;
    }
}
