import { Block } from '../../tools/Block';
import { Error } from '../../components';

export class Error404Page extends Block {
    constructor() {
        super({
            error: new Error({
                backLinkUrl: '',
                errorTitle: 'Ошибка 404',
                errorDescription: 'Не туда попали',
                backLinkTitle: 'Назад к чатам',
                page: 'chat',
            }),
        });
    }

    render() {
        return '{{{ error }}}';
    }
}
