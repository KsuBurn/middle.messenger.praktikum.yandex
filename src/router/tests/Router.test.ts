import { Block } from '../../utils/Block';
import { Router } from '../Router';
import { expect } from 'chai';
import Sinon from 'sinon';

describe('Router Test', () => {
    let router: Router;
    let BlockClass: typeof Block;

    before(() => {
        router = new Router('#app');

        class TestComponent extends Block {
            constructor(props: any) {
                super(props);
            }

            render() {
                return '<div id="test-div">{{text}}</div>';
            }
        }
        BlockClass = TestComponent as typeof Block;

        router
            .use('/', BlockClass);
    });

    it('should add path in Router', () => {
        router
            .use('/test', BlockClass);

        expect(router.getRoutes().length).to.be.eq(2);
    });

    it('Should go to route', () => {
        const pathname = '/test-2';
        router
            .use(pathname, BlockClass);
        const spy = Sinon.spy(router, 'go');

        router.go(pathname);
        expect(spy.calledOnce).to.be.true;

    });

    it('should go backwards', () => {
        const pathname = '/test-3';
        router
            .use(pathname, BlockClass);
        const spy = Sinon.spy(history, 'back');
        router.back();
        expect(spy.calledOnce).to.be.true;
    });
    it('should go forward', () => {
        const pathname = '/test-4';
        router
            .use(pathname, BlockClass);
        const spy = Sinon.spy(history, 'forward');
        router.forward();
        expect(spy.calledOnce).to.be.true;
    });
});
