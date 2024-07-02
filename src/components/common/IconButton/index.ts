import './IconButton.scss';
import { Block } from '../../../utils/Block';
import IconButtonTemplate from './IconButton.hbs?raw';

interface IconButtonProps {
    className?: string;
    page?: string;
    src: string;
    alt: string;
}
export class IconButton extends Block {
    constructor(props: IconButtonProps) {
        super(props);
    }

    render() {
        return IconButtonTemplate;
    }
}
