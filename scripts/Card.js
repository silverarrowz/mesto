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
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._deleteButton.addEventListener(('click'), () => {
            this._handleDeleteClick();
        })

        this._cardImage.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._image);
        });
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__like_active');
    }

    _handleDeleteClick() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__remove');

        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._image;
        
        this._setEventListeners();
        return this._element;
    }
}

export default Card;