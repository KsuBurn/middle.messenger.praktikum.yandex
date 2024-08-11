import './IconButton.scss';
import { Block } from '../../../utils/Block';
import IconButtonTemplate from './IconButton.hbs?raw';

interface IIconButtonProps {
    className?: string;
    src: string;
    alt: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
    type?: string;
}
export class IconButton extends Block<IIconButtonProps> {
    constructor(props: IIconButtonProps) {
        super(props);
    }

    render() {
        return IconButtonTemplate;
    }
}
