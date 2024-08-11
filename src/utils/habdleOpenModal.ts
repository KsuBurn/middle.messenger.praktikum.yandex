export const handleOpenModal = (event: Event, elementClass: string) => {
    if (event.target instanceof HTMLElement) {
        const element = document.querySelector(`.${elementClass}`);
        if (element) {
            element.classList.toggle('dialog-container_hidden');
        }
    }
};
