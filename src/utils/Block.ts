import { EventBus } from './EventBus';
import Handlebars from 'handlebars';

type ObjectType = { [key: string]: any };

enum Events {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render'
}

export interface IProps {
    [key: string]: unknown;
    [key: symbol]: unknown;
    events?: Record<string, EventListenerOrEventListenerObject>;
    attr?: Record<string, string>;
}

export class Block {
    static EVENTS: { [key: string ]: Events} = {
        INIT: Events.INIT,
        FLOW_CDM: Events.FLOW_CDM,
        FLOW_CDU: Events.FLOW_CDU,
        FLOW_RENDER: Events.FLOW_RENDER,
    };

    _element: HTMLElement | null = null;
    _id = Math.floor(100000 + Math.random() * 900000);
    props: IProps;
    children: Record<string, typeof this>;
    lists: Record<string, (typeof this)[]>;
    eventBus: () => EventBus;

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const {
            props,
            children,
            lists,
        } = this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({...props});
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _addEvents(): void {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    componentDidMount(): void {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: IProps, newProps: IProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        if (!oldProps || !newProps) {
            return false;
        }
        return true;
    }

    _getChildrenPropsAndProps(propsAndChildren: IProps): {
        props: IProps;
        children: ObjectType;
        lists: ObjectType;
    } {
        const children: ObjectType = {};
        const props: ObjectType = {};
        const lists: ObjectType = {};

        Object.entries(propsAndChildren).forEach(([key, value]): void => {
            if (value instanceof Block) {
                children[key] = value;
            } else if(Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props, lists};
    }

    addAttributes(): void {
        const {attr = {}} = this.props;

        Object.entries(attr).forEach(([key, value]: [string, any]): void => {
            this._element?.setAttribute(key, value);
        });
    }

    setProps = (nextProps: ObjectType): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _compileElement(): Element | null {
        const propsAndStubs = { ...this.props };
        const _tmpId =  Math.floor(100000 + Math.random() * 900000);

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            const content = child.getContent();
            if (content && stub) {
                stub.replaceWith(content);
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template') as HTMLTemplateElement;
            child.forEach((item) => {
                if (item instanceof Block) {
                    const content = item.getContent();
                    if (content) {
                        listCont.content.append(content);
                    }
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub?.replaceWith(listCont.content);
        });

        return fragment.content.firstElementChild;
    }

    _render(): void {
        const newElement = this._compileElement() as HTMLElement;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    render(): void {}

    getContent(): HTMLElement | Element | null {
        return this.element;
    }

    _makePropsProxy(props: IProps) {
        const self = this;

        return new Proxy(props, {
            get(target: ObjectType, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: ObjectType, prop: string, value) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
        return document.createElement(tagName);
    }

    show(): void {
        if (!this.getContent()) {
            return;
        }

        (this.getContent() as HTMLElement).style.display = 'block';
    }

    hide(): void {
        if (!this.getContent()) {
            return;
        }

        (this.getContent() as HTMLElement).style.display = 'none';
    }
}
