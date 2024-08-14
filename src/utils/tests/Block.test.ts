import { expect } from 'chai';
import { Block } from '../Block';
import { SinonStub, stub } from 'sinon';

describe('Block test', () => {
    let BlockClass: typeof Block;
    before(() => {
        class TestComponent extends Block {
            constructor(props: any) {
                super(props);
            }

            render() {
                return '<div id="test-div">{{text}}</div>';
            }
        }

        BlockClass = TestComponent as typeof Block;
    });

    it('should show the element', () => {
        const block = new BlockClass({ text: 'text'});
        block.show();
        expect(block.element?.style.display).to.equal('block');
    });

    it('should hide the element', () => {
        const block = new BlockClass({ text: 'text'});
        block.hide();
        expect(block.element?.style.display).to.equal('none');
    });

    it('should show props data', () => {
        const textData = 'Props data';
        const component = new BlockClass({ text: textData });
        const res = component.getContent()?.innerHTML;

        expect(res).to.be.eq(textData);
    });

    it('should change props data', () => {
        const text = 'new prop';
        const block = new BlockClass( { text: 'first prop' });
        block.setProps({ text });

        const content = block.getContent();
        expect(content?.outerHTML).to.eq(`<div id="test-div">new prop</div>`);
    });

    it('should set events on the element', () => {
        const testHandleEvent: SinonStub = stub();
        const testEvent = new MouseEvent('click');

        const block = new BlockClass({});
        block.setProps({
            ...block.props,
            events: {
                click: testHandleEvent,
            },
        });

        block.element!.dispatchEvent(testEvent);
        expect(testHandleEvent.calledOnce).to.be.true;
    });
});
