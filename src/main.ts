import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import { PagesUrls } from './router/types';
import { router } from './router/Router';

Object.entries(Components).forEach(([ name, component ]) => {
    if (typeof component === 'string') {
        Handlebars.registerPartial(name, component);
    }
});

router
    .use(PagesUrls.SIGN_IN, Pages.SignInPage)
    .use(PagesUrls.SIGN_UP, Pages.SignUpPage)
    .use(PagesUrls.PROFILE, Pages.ProfilePage)
    .use(PagesUrls.CHAT, Pages.ChatPage)
    .use(PagesUrls.ERROR_404, Pages.Error404Page)
    .use(PagesUrls.ERROR_500, Pages.Error500Page)
    .start();
