import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';

type PagesType = {
    [key: string]: [any, props?: any];
}
const pages: PagesType = {
    'start': [ Pages.StartPage ],
    'sign-in': [ Pages.SignInPage ],
    'sign-up': [ Pages.SignUpPage ],
    'profile': [ Pages.ProfilePage ],
    'chat': [ Pages.ChatPage ],
    'error-404': [ Pages.Error404Page ],
    'error-500': [ Pages.Error500Page ],
};

Object.entries(Components).forEach(([ name, component ]) => {
    if (typeof component === 'string') {
        Handlebars.registerPartial(name, component);
    }
});

function navigate(page: string): void {
    const [source, props] = pages[page];

    const Page = new source(props)
    const container = document.getElementById('app')!;
    container.append(Page.getContent()!);
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
