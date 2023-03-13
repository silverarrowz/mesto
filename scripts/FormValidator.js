export class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
      this._submitButton = formElement.querySelector(config.submitButtonSelector);
      this._inactiveButtonClass = config.inactiveButtonClass;
    }
  
    _showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
      input.classList.add(this._config.inputErrorClass);
    }
  
    _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      errorElement.classList.remove(this._config.errorClass);
      input.classList.remove(this._config.inputErrorClass);
    }
  
    _checkInputValidity(input) {
      if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some((input) => {
        return !input.validity.valid;
      });
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableSubmitButton();
      } else {
        this._enableSubmitButton();
      }
    }
  
    _setEventListeners() {
      this._toggleButtonState();
  
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
      });
  
      this._formElement.addEventListener('reset', () => {
        this._disableSubmitButton();
      });
    }
  
    _disableSubmitButton() {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    }

    _enableSubmitButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.removeAttribute('disabled');
    }
  
    enableValidation() {
      this._setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    }
  }