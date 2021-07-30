import {popupConfig} from '../utils/constants.js';

export default function Main() {
  const handleEditAvatarClick = () => {
    const avatarEditPopup = document.querySelector(`${popupConfig.popupSelectorPrefix+popupConfig.profileAvatarEditPopupAndFormName}`);
    avatarEditPopup.classList.add(popupConfig.popupOpenedClass);
  };

  const handleEditProfileClick = () => {
    const profileEditPopup = document.querySelector(`${popupConfig.popupSelectorPrefix+popupConfig.profileEditPopupAndFormName}`);
    profileEditPopup.classList.add(popupConfig.popupOpenedClass);
  };

  const handleAddPlaceClick = () => {
    const addCardPopup = document.querySelector(`${popupConfig.popupSelectorPrefix+popupConfig.profileAddPopupAndFormName}`);
    addCardPopup.classList.add(popupConfig.popupOpenedClass);
  };

  return (
    <main className="content body__element">
      <section className="profile body__element">
        <div className="profile__pic-info-container">
          <div className="profile__pic-container">
            <img src="http://" alt="фото аккаунта" className="profile__pic" />
            <button className="profile__avatar-edit-button transparent transparent_amount_much-more" onClick={handleEditAvatarClick}></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit-wrap">
              <h1 className="profile__name"></h1>
              <button className="profile__edit-button transparent transparent_amount_more"
                      type="button" aria-label="Кнопка редактирования профиля" onClick={handleEditProfileClick}></button>
            </div>
            <p className="profile__description"></p>
          </div>
        </div>
        <button className="profile__add-button transparent transparent_amount_more"
                type="button" aria-label="Кнопка добавления карточки места" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="places body__element">
        <ul className="places__list body__element">
        </ul>
      </section>
    </main>
  );
}
