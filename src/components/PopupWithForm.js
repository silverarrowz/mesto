import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);    
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__item');
  }

  _getInputValues() {    
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }

  setInputValues(dataObj) {
    this._inputs.forEach((input) => {
      input.value = dataObj[input.name];
    })
  }
  
  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());      
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}