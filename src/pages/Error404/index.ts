import { Block } from '../../utils/Block';
import { Error } from '../../components';

interface Error404PageProps {
    error: Error;
}

export class Error404Page extends Block<Error404PageProps> {
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
