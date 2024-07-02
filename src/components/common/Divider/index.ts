import './Divider.scss';
import { Block } from '../../../utils/Block';
import DividerTemplate from './Divider.hbs?raw';

interface DividerProps {
    className?: string;
}
export class Divider extends Block {
    constructor(props: DividerProps) {
        super(props);
    }

    render() {
        return DividerTemplate;
    }
}
