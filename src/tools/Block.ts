import { EventBus } from './EventBus';
import Handlebars from 'handlebars';

type ObjectType = { [key: string]: any };

enum Events {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render"
}

interface IBlock {
    _element: HTMLElement | Element | null;
    _id: number;
    props: ObjectType;
    children: ObjectType;
    lists: ObjectType;
    eventBus: () => EventBus | null;
    _createDocumentElement: (tagName: string) => HTMLElement;
    init: () => void;
    _addEvents: () => void;
    dispatchComponentDidMount: () => void;
    _registerEvents: (eventBus: EventBus) => void;
    componentDidMount: (oldProps?: ObjectType) => void;
    _componentDidUpdate: (oldProps: ObjectType, newProps: ObjectType) => void;
    componentDidUpdate: (oldProps: ObjectType, newProps: ObjectType) => boolean;
    setProps: (nextProps: ObjectType) => void;
    _render: () => void;
    render: () => void;
    getContent: () => HTMLElement | Element | null;
    _makePropsProxy: (props: ObjectType) => ObjectType;
    show: () => void;
    hide: () => void;
}

export class Block implements IBlock {
    static EVENTS: { [key: string ]: Events} = {
        INIT: Events.INIT,
        FLOW_CDM: Events.FLOW_CDM,
        FLOW_CDU: Events.FLOW_CDU,
        FLOW_RENDER: Events.FLOW_RENDER,
    };

    _element: HTMLElement | Element | null = null;
    _id = Math.floor(100000 + Math.random() * 900000);
    props: ObjectType;
    children: ObjectType;
    lists: ObjectType;
    eventBus;

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        const {
            props,
            children,
            lists,
        }: {
            props: ObjectType;
            children: ObjectType;
            lists: ObjectType;
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

    // @ts-ignore
    componentDidMount(oldProps?: ObjectType): void {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: ObjectType, newProps: ObjectType): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // @ts-ignore
    componentDidUpdate(oldProps: ObjectType, newProps: ObjectType): boolean {
        return true;
    }

    _getChildrenPropsAndProps(propsAndChildren: ObjectType): { props: ObjectType; children: ObjectType; lists: ObjectType} {
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
    }

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

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach(child => {
            const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child._id}"]`)
            stub?.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([, child]: [string, any]) => {
            const listCont = this._createDocumentElement('template');
            child.forEach(item => {
                if (item instanceof Block) {
                    (listCont as HTMLTemplateElement).content.append(item.getContent());
                } else {
                    (listCont as HTMLTemplateElement).content.append(`${item}`);
                }
            });
            const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub?.replaceWith((listCont as HTMLTemplateElement).content);
        });

        return (fragment as HTMLTemplateElement).content.firstElementChild
    }

    _render(): void {
        const newElement = this._compileElement();

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

    _makePropsProxy(props: ObjectType) {
        const self = this;

        return new Proxy(props, {
            get(target: ObjectType, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: ObjectType, prop: string, value) {
                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
        return document.createElement(tagName);
    }

    show(): void {
        if (!this.getContent()) {
            return
        }

        (this.getContent() as HTMLElement).style.display = "block";
    }

    hide(): void {
        if (!this.getContent()) {
            return
        }

        (this.getContent() as HTMLElement).style.display = "none";
    }
}
