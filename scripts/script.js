import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constants.js";

const btnPopupCreateCard = document.querySelector('.profile__add-button');
const btnPopupEditProfile = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms["profile-form"];
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__field_user_name');
const aboutInput = document.querySelector('.form__field_user_about');

const popupCreateCard = document.querySelector('.popup_type_create-card');
const formCreateCard = document.forms["create-card-form"];
const cardNameInput = document.querySelector('.form__field_place-name');
const cardPictureInput = document.querySelector('.form__field_place-picture');

const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImage = popupImagePreview.querySelector('.popup__image');
const popupImageTitle = popupImagePreview.querySelector('.popup__image-title');

const elements = document.querySelector('.elements');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function openPopupImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImagePreview);
}

btnPopupEditProfile.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
btnPopupCreateCard.addEventListener('click', function () {
  openPopup(popupCreateCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup || evt.target.classList.contains('popup__close-button')) {
      closePopup(this);
    };
  });
})

initialCards.forEach((item) => {
  elements.append(createCardElement(item));
})

formCreateCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = { name: cardNameInput.value, link: cardPictureInput.value };
  elements.prepend(createCardElement(newCard));

  evt.target.reset();
  closePopup(popupCreateCard);
});

function createCardElement(item) {
  const card = new Card(item, '#card-template', openPopupImage);
  return card.generateCard();
}

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const cardFormValidator = new FormValidator(validationConfig, formCreateCard);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

