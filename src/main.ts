import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import { profileState } from './pages/Profile';

type PagesType = {
    [key: string]: [string, args?: any];
}
const pages: PagesType = {
    'start': [Pages.StartPage],
    'sign-in': [ Pages.SignIn ],
    'sign-up': [ Pages.SignUp ],
    'profile': [ Pages.Profile, profileState ],
    'chat': [ Pages.ChatPage ],
    'error-404': [Pages.Error404Page],
    'error-500': [Pages.Error500Page],
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page: string): void {
    const [source, args] = pages[page];
    document.body.innerHTML = Handlebars.compile(source)(args);
}

document.addEventListener('DOMContentLoaded', (): void => {
    const pathName = window.location.pathname === '/' ? 'start' : window.location.pathname.replace('/', '');
    navigate(pathName);
});

document.addEventListener('click', (e: Event): void => {
    const page = (e.target as HTMLElement)?.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
