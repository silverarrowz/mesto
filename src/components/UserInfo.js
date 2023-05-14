export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, avatarSelector) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(avatarSelector);    
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._userId = data._id;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserId() {
    return this._userId;
  }
}