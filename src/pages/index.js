import './index.css';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";

import {
  initialCards,
  validationConfig,
  btnPopupEditProfile,
  btnPopupCreateCard,
  formCreateCard,
  formEditProfile,
  nameInput,
  aboutInput
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const createCardFormValidator = new FormValidator(validationConfig, formCreateCard);
const popupWithImage = new PopupWithImage('.popup_type_image-preview');
const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: () => {
    userInfo.setUserInfo(nameInput.value, aboutInput.value);
    popupEditProfile.close();
  }
})

btnPopupEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.name;
  aboutInput.value = newUserInfo.about;
});

const createCard = (item) => {
  const card = new Card (item, '#card-template', popupWithImage.open);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.elements');


const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_type_create-card',
  handleFormSubmit: (item) => {
    console.log(createCard(item));
    cardList.addItem(createCard(item));
    console.log(item);
    popupCreateCard.close();
  }
})

btnPopupCreateCard.addEventListener('click', () => {
  popupCreateCard.open();
});

popupCreateCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

cardList.renderItems();

profileFormValidator.enableValidation();
createCardFormValidator.enableValidation();
