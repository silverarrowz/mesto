const addBtn = document.querySelector('.profile__add-button');
const editBtn = document.querySelector('.profile__edit-button');
const closeBtns = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEdit = document.querySelector('.form_type_edit-profile'); 
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('.form__field_user_name');
const titleInput = document.querySelector('.form__field_user_title');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  closePopup(popupEditProfile);
}

function addCard(name, link) {
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
    return addCard(item.name, item.link);
  });
  elements.append(...cards);
}

editBtn.addEventListener('click', openPopupEditProfile);
formEdit.addEventListener('submit', profileFormSubmitHandler);

addBtn.addEventListener('click', function () {
  openPopup(popupCreateCard);
});

formCreateCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  elements.prepend(addCard(cardNameInput.value, cardPictureInput.value));
  evt.target.reset();
  closePopup(popupCreateCard);
});

closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener('click', function () {
    closePopup(this.closest('.popup'));
  });
})

renderCards();