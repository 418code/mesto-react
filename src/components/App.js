import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import {popupConfig} from '../utils/constants.js';

export default function App() {
  return (
    <div className="page body__element">
        <Header />
        <Main />
        <Footer />
        <PopupWithForm name={popupConfig.profileEditPopupAndFormName} formTitle="Редактировать профиль" submitButtonText="Сохранить">
          <input id="popup__profile-name-input" type="text" name="profileName"
            className="popup__form-text" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required="required" />
          <span className="popup__profile-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
          <input id="popup__profile-description-input" type="text" name="profileDescription"
            className="popup__form-text" placeholder="Исследователь океана" minLength="2" maxLength="200" required="required" />
          <span className="popup__profile-description-input-error popup__form-text-error">Вы пропустили это поле.</span>
        </PopupWithForm>
        <PopupWithForm name={popupConfig.profileAddPopupAndFormName} formTitle="Новое место" submitButtonText="Создать">
          <input id="popup__place-name-input" type="text" name="placeName"
            className="popup__form-text" placeholder="Название" minLength="2" maxLength="30" required="required" />
          <span className="popup__place-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
          <input id="popup__place-url-input" type="url" name="placeUrl" className="popup__form-text" placeholder="Ссылка на картинку" required="required" />
          <span className="popup__place-url-input-error popup__form-text-error">Введите адрес сайта.</span>
        </PopupWithForm>
        <PopupWithForm name={popupConfig.profileAvatarEditPopupAndFormName} formTitle="Обновить аватар" submitButtonText="Сохранить">
          <input id="popup__profile-avatar-url-input" type="url" name="avatarUrl" className="popup__form-text" placeholder="Ссылка на аватар" required="required" />
          <span className="popup__profile-avatar-url-input-error popup__form-text-error">Введите адрес аватара.</span>
        </PopupWithForm>
        <PopupWithForm name={popupConfig.cardConfirmDeletePopupAndFormName} formTitle="Вы уверены?" submitButtonText="Да">
        </PopupWithForm>

        <div className="popup popup_transparent_slightly" id="showPhoto">
          <div className="popup__container">
            <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
            <img src="#" alt="#" className="popup__photo" />
            <p className="popup__photo-description"></p>
          </div>
        </div>
      </div>
  );
}
