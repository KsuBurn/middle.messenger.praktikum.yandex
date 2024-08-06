import './IconButton.scss';
import { Block } from '../../../utils/Block';
import IconButtonTemplate from './IconButton.hbs?raw';

interface IconButtonProps {
    className?: string;
    src: string;
    alt: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    type?: string;
}
export class IconButton extends Block<IconButtonProps> {
    constructor(props: IconButtonProps) {
        super(props);
    }

    render() {
        return IconButtonTemplate;
    }
}
