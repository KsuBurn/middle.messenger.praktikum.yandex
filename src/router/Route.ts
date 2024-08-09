import { Block } from '../utils/Block';

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    const content = block.getContent();

    if (!root || !content) {
        return;
    }

    root.innerHTML = '';

    root.append(content);

    block.dispatchComponentDidMount();

    return root;
}

export class Route {
    private _pathname: string;
    private _blockClass;
    private _block: Block | null;
    private _props: { rootQuery: string } & Record<string, unknown>;

    constructor(pathname: string, block: typeof Block, props: { rootQuery: string } & Record<string, unknown>) {
        this._pathname = pathname;
        this._blockClass = block;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block = null;
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
        }
        render(this._props.rootQuery, this._block);
    }
}
