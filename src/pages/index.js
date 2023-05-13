import './index.css';
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationConfig } from "../utils/constants.js";

const formEditProfile = document.forms["profile-form"];
const nameInput = document.querySelector('.form__field_user_name');
const aboutInput = document.querySelector('.form__field_user_about');
const btnPopupEditProfile = document.querySelector('.profile__edit-button');
const formCreateCard = document.forms["create-card-form"];
const btnPopupCreateCard = document.querySelector('.profile__add-button');

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const createCardFormValidator = new FormValidator(validationConfig, formCreateCard);
const popupWithImage = new PopupWithImage('.popup_type_image-preview');
const userInfo = new UserInfo('.profile__name', '.profile__about');

let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'cb845812-1340-4892-b22b-916a24c0d3df'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {    
    userId = userData._id;
    userInfo.setUserInfo(userData);
    //cardsData.forEach((card) => { УБРАТЬ
    cardList.renderItems(cardsData);    
    userInfo.setAvatar(userData);
  })
  .catch(err => console.log(err));


const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.about);
    popupEditProfile.close();
  }
})

const createCard = (item) => {
  const card = new Card (item, '#card-template', popupWithImage.open);
  return card.generateCard();
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.elements');

const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_type_create-card',
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
    popupCreateCard.close();
  }
})

const openPopupEditProfile = () => {
  popupEditProfile.open();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.name;
  aboutInput.value = newUserInfo.about;
}

const openPopupCreateCard = () => {
  popupCreateCard.open();
}

btnPopupEditProfile.addEventListener('click', openPopupEditProfile);
btnPopupCreateCard.addEventListener('click', openPopupCreateCard);

popupCreateCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

cardList.renderItems(initialCards);

profileFormValidator.enableValidation();
createCardFormValidator.enableValidation();
