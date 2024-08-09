import { Block } from '../../utils/Block';

import { Error } from '../../components';

interface IError500PageProps {
    error: Error;
}

export class Error500Page extends Block<IError500PageProps> {
    constructor() {
        super({
            error: new Error({
                backLinkUrl: '',
                errorTitle: 'Ошибка 500',
                errorDescription: 'Мы уже фиксим',
                backLinkTitle: 'Назад к чатам',
            }),
        });
    }

    render() {
        return '{{{ error }}}';
    }
}
