let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-button');
let closeBtn = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let nameInput = document.querySelector('.form__field_user_name');
let titleInput = document.querySelector('.form__field_user_title');
let formEdit = document.querySelector('.form');

function openForm() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  titleInput.value = profileTitle.textContent;
}

function closeForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = titleInput.value;
  closeForm();
}

editBtn.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeForm);
formEdit.addEventListener('submit', formSubmitHandler);