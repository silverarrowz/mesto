const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass}) => {

    const showInputError = (form, input, errorMessage) => {
      const errorElement = form.querySelector(`.${input.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
      input.classList.add(inputErrorClass);
    };
    
    const hideInputError = (form, input) => {
      const errorElement = form.querySelector(`.${input.id}-error`);
      errorElement.classList.remove(errorClass);
      input.classList.remove(inputErrorClass);
    }
    
    const checkInputValidity = (form, input) => {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
    };

    const hasInvalidInput = (inputs) => {
      return inputs.some((input) => {
        return !input.validity.valid;
      });
    }
  
    const toggleButtonState = (inputs, submitButton) => {
      if (hasInvalidInput(inputs)) {
        submitButton.classList.add(inactiveButtonClass);
      } else {
        submitButton.classList.remove(inactiveButtonClass);
      }
    };

    const setEventListeners = (form) => {
      const inputs = Array.from(form.querySelectorAll(inputSelector));
      const submitButton = form.querySelector(submitButtonSelector);
    
      toggleButtonState(inputs, submitButton);
    
      inputs.forEach((input) => {
        input.addEventListener('input', function () {
          checkInputValidity(form, input);
          toggleButtonState(inputs, submitButton);
        });
      });
    }

    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
      setEventListeners(form);
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    });
  }

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__input-error_visible'
  });
