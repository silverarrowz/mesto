export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); 
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._submitBtn = this._popup.querySelector('.form__save-btn');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = text;
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      };
    });
  }    
}