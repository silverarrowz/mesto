import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._handleSubmitCallback = handleSubmitCallback;
    this._form = this._popup.querySelector('.form');
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = text;
    }
  }
  
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
  
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback()
    });
    super.setEventListeners();
  }
}