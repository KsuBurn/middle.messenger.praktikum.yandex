import './StartPage.scss';
import { Block } from '../../utils/Block';
import { Link } from '../../components';
import StartPageTemplate from './StartPage.hbs?raw';

interface StartPageProps {
    lists: Link[]
}

export class StartPage extends Block<StartPageProps> {
    constructor() {
        super({
            lists: [
                new Link({ title: 'Sign In', page: 'sign-in', url: '' }),
                new Link({ title: 'Sign Up', page: 'sign-up', url: '' }),
                new Link({ title: 'Profile', page: 'profile', url: '' }),
                new Link({ title: 'Chats', page: 'chat', url: '' }),
                new Link({ title: '404', page: 'error-404', url: '' }),
                new Link({ title: '500', page: 'error-500', url: '' }),
            ],
        });
    }

    override render() {
        return StartPageTemplate;
    }
}
