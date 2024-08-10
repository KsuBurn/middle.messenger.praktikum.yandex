import { Fields, validationRules } from './validationRules';
import { InputField } from '../components';
import { Indexed } from './types';
import { IInputFieldProps } from '../components/common/InputField';

export const checkValidation = (fieldName: Fields, fieldValue: string = '', inputField: InputField) => {
    const rule = validationRules[fieldName];
    const isValid =  rule && rule.test(fieldValue);
    if (isValid) {
        inputField.setProps({
            value: fieldValue,
            error: '',
        } as IInputFieldProps);
        return true;
    }

    inputField.setProps({
        value: fieldValue,
        error: 'Поле заполнено некорректно',
    } as IInputFieldProps);
    return false;
};

export const isPasswordsEqual = (pass: string, repeatedPass: string, inputField: InputField) => {
    if (pass.length && repeatedPass.length && pass === repeatedPass) {
        inputField.setProps({
            value: repeatedPass,
            error: '',
        } as IInputFieldProps);
        return true;
    }

    inputField.setProps({
        value: repeatedPass,
        error: 'Поле заполнено некорректно',
    } as IInputFieldProps);
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

export const submitForm = (inputs: InputField[]): Indexed | null => {
    const isFormValid = formValidation(inputs);

    if (isFormValid) {
        return inputs.reduce((result: Record<string, unknown>, input) => {
            if (input.children.input) {
                const el = input.children.input.getContent() as HTMLInputElement;
                result[el.name] = el.value;
            }
            return result;
        }, {});
    }

    return null;
};
