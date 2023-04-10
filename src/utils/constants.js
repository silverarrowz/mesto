export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__input-error_visible'
};

export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = document.forms["profile-form"];
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = document.querySelector('.form__field_user_name');
export const aboutInput = document.querySelector('.form__field_user_about');
export const btnPopupEditProfile = document.querySelector('.profile__edit-button');

export const popupCreateCard = document.querySelector('.popup_type_create-card');
export const btnPopupCreateCard = document.querySelector('.profile__add-button');
export const formCreateCard = document.forms["create-card-form"];

export const cardNameInput = document.querySelector('.form__field_place-name');
export const cardPictureInput = document.querySelector('.form__field_place-picture');
export const cardTemplate = document.querySelector('.element-template');

export const popupImage = document.querySelector('.popup_type_image-preview');
export const popupImageTitle = popupImage.querySelector('.popup__image-title');
export const popupImagePicture = popupImage.querySelector('.popup__image');

export const containerSelector = document.querySelector('.elements');

export const popupSelector = document.querySelectorAll('.popup');