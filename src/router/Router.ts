import { Route } from './Route';
import { Block } from '../utils/Block';
import { PagesUrls } from './types';
import * as Pages from '../pages';
import { store } from '../store/Store';
import { AuthAPI } from '../api/AuthApi';

class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string = '';
    private readonly _authApi;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
        this._authApi = new AuthAPI();
    }

    async isAuthorized() {
        try {
            const data = await this._authApi?.getUser();
            const userData = JSON.parse(data as string);
            store.set('user', userData);
            return !!userData;
        } catch (e) {
            return false;
        }
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);

        return this;
    }

    async start() {
        const isAuthorized = await this.isAuthorized();

        window.onpopstate = event => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        };
        console.log('isAuthorized',window.location.pathname);
        // this._onRoute(window.location.pathname);
        if (isAuthorized) {
            ['/', PagesUrls.SIGN_UP].includes(window.location.pathname) ? this.go(PagesUrls.CHAT) : this._onRoute(window.location.pathname);
        } else {
            window.location.pathname === PagesUrls.SIGN_UP ? this._onRoute(window.location.pathname) : this.go('/');
        }
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if(!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        let route = this.routes.find(route => route.match(pathname));

        if (!route) {
            route = new Route(PagesUrls.ERROR_404, Pages.Error404Page as typeof Block, { rootQuery: this._rootQuery });
        }

        return route;
    }
}

export const router = new Router('#app');
