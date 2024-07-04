import { Block } from '../../utils/Block';

import { Error } from '../../components';

interface Error500PageProps {
    error: Error;
}

export class Error500Page extends Block<Error500PageProps> {
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
