import './ChatAvatar.scss';
import ChatAvatarTemplate from './ChatAvatar.hbs?raw';
import { Block } from '../../../utils/Block';

interface IChatAvatarProps {
    avatar: string | null;
}

export class ChatAvatar extends Block<IChatAvatarProps> {
    constructor(props: IChatAvatarProps) {
        super({
            ...props,
            avatar: props.avatar ? `https://ya-praktikum.tech/api/v2/resources${props.avatar}` : '',
        });
    }

    override render() {
        return ChatAvatarTemplate;
    }
}
