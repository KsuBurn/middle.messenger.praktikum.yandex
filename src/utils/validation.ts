import { Fields, validationRules } from './validationRules';
import { InputField } from '../components';

export const checkValidation = (fieldName: Fields, fieldValue: string = '', inputField: InputField) => {
    const rule = validationRules[fieldName];
    const isValid =  rule && rule.test(fieldValue);

    if (isValid) {
        inputField.setProps({
            ...inputField.props,
            error: '',
        });
        return true;
    }

    inputField.setProps({
        ...inputField.props,
        error: 'Поле заполнено некорректно',
    });
    return false;
};

export const formValidation = (inputs: InputField[]) => {
    let isFormValid = true;
    inputs.every((item) => {
        const el = item.children.input.getContent() as HTMLInputElement;
        const validState = checkValidation(el.name as Fields, el.value, item);
        if (!validState) {
            isFormValid = validState;
        }
        return true;
    });
    return isFormValid;
};

export const submitForm = (inputs: InputField[]) => {
    const isFormValid = formValidation(inputs);

    if (isFormValid) {
        const formValues = inputs.reduce((result: Record<string, unknown>, input) => {
            if (input.children.input) {
                const el = input.children.input.getContent() as HTMLInputElement;
                result[el.name] = el.value;
            }
            return result;
        }, {});

        return formValues;
    }

    return null;
};
