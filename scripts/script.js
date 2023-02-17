const btnPopupCreateCard = document.querySelector('.profile__add-button');
const btnPopupEditProfile = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.form_type_edit-profile'); 
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.form__field_user_name');
const aboutInput = document.querySelector('.form__field_user_about');

const popupCreateCard = document.querySelector('.popup_type_create-card');
const formCreateCard = document.querySelector('.form_type_create-card');
const cardNameInput = document.querySelector('.form__field_place-name');
const cardPictureInput = document.querySelector('.form__field_place-picture');

const popupImagePreview = document.querySelector('.popup_type_image-preview');
const popupImage = popupImagePreview.querySelector('.popup__image');
const popupImageTitle = popupImagePreview.querySelector('.popup__image-title');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const elements = document.querySelector('.elements');

const initialCards = [
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closeOnEsc();
}

function closeOnEsc() {
  document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
});
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__image').src = link;

  cardElement.querySelector('.element__remove').addEventListener('click', () => {
    cardElement.remove();
  });

  const cardLike = cardElement.querySelector('.element__like')
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__image').addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name;
    openPopup(popupImagePreview);
  });

  return cardElement;
}

function renderCards() {
  const cards = initialCards.map((item) => {
    return createCard(item.name, item.link);
  });
  elements.append(...cards);
}

btnPopupEditProfile.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', profileFormSubmitHandler);

btnPopupCreateCard.addEventListener('click', function () {
  openPopup(popupCreateCard);
});

formCreateCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  elements.prepend(createCard(cardNameInput.value, cardPictureInput.value));
  evt.target.reset();
  closePopup(popupCreateCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup || evt.target.classList.contains('popup__close-button')) {
      closePopup(this);
    };
  });
})

renderCards();