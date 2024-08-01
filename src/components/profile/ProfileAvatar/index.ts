import './ProfileAvatar.scss';
import ProfileAvatarTemplate from './ProfileAvatar.hbs?raw';
import { Block } from '../../../utils/Block';

interface IProfileAvatarProps {
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class ProfileAvatar extends Block<IProfileAvatarProps> {
    constructor(props: IProfileAvatarProps) {
        super(props);
    }

    override render() {
        return ProfileAvatarTemplate;
    }
}
