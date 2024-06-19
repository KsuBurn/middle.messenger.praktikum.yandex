import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import { profileState } from "./pages/Profile";

const pages = {
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

function navigate(page) {
    const [source, args] = pages[page];
    document.body.innerHTML = Handlebars.compile(source)(args);
}

document.addEventListener('DOMContentLoaded', () => {
    const pathName = window.location.pathname === '/' ? 'start' : window.location.pathname.replace('/', '');
    navigate(pathName);
});

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
