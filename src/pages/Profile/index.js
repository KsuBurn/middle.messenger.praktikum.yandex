import './Profile.scss';
export { default as Profile } from './Profile.hbs?raw';

export const profileState = {
    isDataChanging: true,
    isPasswordChanging: false,
    isSomeChanging: function () {
        return this.isPasswordChanging || this.isDataChanging
    },
}
