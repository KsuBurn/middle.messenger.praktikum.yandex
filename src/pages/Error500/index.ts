import { Block } from '../../tools/Block';

import { Error } from '../../components';

export class Error500Page extends Block {
    constructor() {
        super({
            error: new Error({
                backLinkUrl: '',
                errorTitle: 'Ошибка 500',
                errorDescription: 'Мы уже фиксим',
                backLinkTitle: 'Назад к чатам',
                page: 'chat',
            }),
        });
    }

    render() {
        return '{{{ error }}}';
    }
}
