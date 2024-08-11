import './ProfileAvatar.scss';
import ProfileAvatarTemplate from './ProfileAvatar.hbs?raw';
import { Block } from '../../../utils/Block';
import { connect } from '../../../store/connect';
import { isEqual } from '../../../utils/isEqual';
import { Indexed } from '../../../utils/types';

interface IProfileAvatarProps {
    avatar?: string;
    events?: Record<string, EventListenerOrEventListenerObject>;
}

export class ProfileAvatarClass extends Block<IProfileAvatarProps> {
    constructor(props: IProfileAvatarProps) {
        super(props);
    }

    componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
        if (!isEqual(oldProps, newProps)) {
            this.setProps({
                avatar: newProps.user?.avatar ?
                    `https://ya-praktikum.tech/api/v2/resources${newProps.user?.avatar}` :
                    undefined,
            });
        }
        return true;
    }

    override render() {
        return ProfileAvatarTemplate;
    }
}

const withUser = connect(state => ({ user: state.user }));
export const ProfileAvatar = withUser(ProfileAvatarClass as typeof Block);
