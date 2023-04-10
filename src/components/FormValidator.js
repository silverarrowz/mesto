export class FormValidator {
  constructor(config, formElement) {
    this._config = config,
    this._formElement = formElement,
    this._formSelector = config.formSelector,
    this._inputSelector = config.inputSelector,
    this._submitButtonSelector = config.submitButtonSelector,
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
    
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);    
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleBtnState() {
    if(this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  
  _setEventListeners() {
    this._toggleBtnState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleBtnState();
      });
    });

    this._formElement.addEventListener('reset', () => {
      this._disableSubmitButton();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
