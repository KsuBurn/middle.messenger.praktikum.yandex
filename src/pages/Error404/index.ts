import { Block } from '../../utils/Block';
import { Error } from '../../components';
import { PagesUrls } from '../../router/types';

interface Error404PageProps {
    error: Error;
}

export class Error404Page extends Block<Error404PageProps> {
    constructor() {
        super({
            error: new Error({
                backLinkUrl: PagesUrls.CHAT,
                errorTitle: 'Ошибка 404',
                errorDescription: 'Не туда попали',
                backLinkTitle: 'Назад к чатам',
            }),
        });
    }

    render() {
        return '{{{ error }}}';
    }
}
