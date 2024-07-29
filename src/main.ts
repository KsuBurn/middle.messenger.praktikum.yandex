import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import { PagesUrls } from './router/types';
import { router } from './router/Router';
import { Block } from './utils/Block';

Object.entries(Components).forEach(([ name, component ]) => {
    if (typeof component === 'string') {
        Handlebars.registerPartial(name, component);
    }
});

router
    .use(PagesUrls.SIGN_IN, Pages.SignInPage as typeof Block)
    .use(PagesUrls.SIGN_UP, Pages.SignUpPage as typeof Block)
    .use(PagesUrls.PROFILE, Pages.ProfilePage as typeof Block)
    .use(PagesUrls.CHAT, Pages.ChatPage as typeof Block)
    .use(PagesUrls.ERROR_404, Pages.Error404Page as typeof Block)
    .use(PagesUrls.ERROR_500, Pages.Error500Page as typeof Block)
    .start();
