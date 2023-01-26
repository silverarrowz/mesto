let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__title');
let nameInput = document.querySelector('.form__field_user_name');
let aboutInput = document.querySelector('.form__field_user_title');
let formEdit = document.querySelector('.form');

function toggleForm() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  toggleForm();
}

editBtn.addEventListener('click', toggleForm);
closeBtn.addEventListener('click', toggleForm);
formEdit.addEventListener('submit', formSubmitHandler);