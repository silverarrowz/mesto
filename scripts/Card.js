class Card {
    constructor(data, templateSelector, handleOpenPopup) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._image = data.link;
        this._handleOpenPopup = handleOpenPopup;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.element__remove').addEventListener(('click'), () => {
            this._handleDeleteClick();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._image);
        });
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleDeleteClick() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__image').src = this._image;

        
        this._setEventListeners();
        return this._element;
    }
}

export default Card;