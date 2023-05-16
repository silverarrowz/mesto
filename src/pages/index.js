import './index.css';
import Api from '../components/Api.js';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { config } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";

const formEditProfile = document.forms["profile-form"];
const btnPopupEditProfile = document.querySelector('.profile__edit-btn');
const formCreateCard = document.forms["create-card-form"];
const btnPopupCreateCard = document.querySelector('.profile__add-btn');
const formAvatar = document.forms["avatar-form"];
const btnUpdteAvatar = document.querySelector('.profile__edit-avatar-btn')

const profileFormValidation = new FormValidator(config, formEditProfile);
const createCardFormValidation = new FormValidator(config, formCreateCard);
const avatarFormValidation = new FormValidator(config, formAvatar);
const popupWithImage = new PopupWithImage('.popup_type_image-preview');
const nameInput = formEditProfile.querySelector('.form__item_user_name');
const aboutInput = formEditProfile.querySelector('.form__item_user_about');

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
const popupCardDeleteConfirm = new PopupWithConfirmation('.popup_type_card-delete');
let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'cb845812-1340-4892-b22b-916a24c0d3df',
    'Content-type': 'application/json'
  }
});

const handleApiError = (err) => {
  console.log(err);
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardList.renderItems(cardsData);
  })
  .catch(handleApiError);


const createCard = (item) => {
  const card = new Card({
    data: item,
    userId: userInfo.getUserId(),
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteCard: (card) => {
      popupCardDeleteConfirm.open();
      popupCardDeleteConfirm.setSubmitAction(() => {
        api.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupCardDeleteConfirm.close();
          })
          .catch(handleApiError);
      })
    },
    handleLikeClick: () => {
      api.changeLikeStatus(item._id, !card.getLikeStatus())
        .then((res) => {
          card.isLiked = card.setLikes(res);
        })
        .catch(handleApiError);
    }
  },
    '.element-template');
  const cardElement = card.generateCard();
  card.checkLikeStatus();
  return cardElement;
}

const cardList = new Section({
  renderer: (item) => {
    cardList.appendItem(createCard(item));
  },
}, '.elements');

const popupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit_profile',
  handleFormSubmit: (inputData) => {
    api.editProfile(inputData)
      .then(res => {
        userInfo.setUserInfo(res);
        popupProfileEdit.close();
      })
      .catch(handleApiError)
      .finally(() => popupProfileEdit.renderLoading(false, 'Сохранить'))
  }
});

const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (inputData) => {
    api.createCard(inputData)
      .then((res) => {
        cardList.addItem(createCard(res));
        popupCreateCard.close();
      })
      .catch(handleApiError)
      .finally(() => popupCreateCard.renderLoading(false, 'Создать'))
  }
});

const popupAvatarUpdate = new PopupWithForm({
  popupSelector: '.popup_type_avatar-edit',
  handleFormSubmit: (inputData) => {
    api.updateAvatar(inputData.link)
      .then((res) => {
        userInfo.setAvatar({ avatar: res.avatar });
        popupAvatarUpdate.close();
      })
      .catch(handleApiError)
      .finally(() => popupAvatarUpdate.renderLoading(false, 'Сохранить'))
  }
});

const openPopupProfileEdit = () => {
  popupProfileEdit.open();
  profileFormValidation.resetValidation();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.name;
  aboutInput.value = newUserInfo.about;
}
const openPopupCreateCard = () => {
  popupCreateCard.open();
}
const openPopupAvatarUpdate = () => {
  popupAvatarUpdate.open();
} 

btnPopupCreateCard.addEventListener('click', openPopupCreateCard);
btnUpdteAvatar.addEventListener('click', openPopupAvatarUpdate);
btnPopupEditProfile.addEventListener('click', openPopupProfileEdit);

popupWithImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupAvatarUpdate.setEventListeners();
popupCreateCard.setEventListeners();
popupCardDeleteConfirm.setEventListeners();

profileFormValidation.enableValidation();
createCardFormValidation.enableValidation();
avatarFormValidation.enableValidation();