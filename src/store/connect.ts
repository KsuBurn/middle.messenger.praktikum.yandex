import { Block } from '../utils/Block';
import { store, StoreEvents } from './Store';
import { Indexed } from '../utils/types';
import { isEqual } from '../utils/isEqual';

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block<Record<string, unknown>>) {
        return class extends Component {
            constructor(props: Record<string, unknown>) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({...props, ...state});

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}
