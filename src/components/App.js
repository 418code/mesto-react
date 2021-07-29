import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function App() {
  return (
    <div className="page body__element">
        <Header />
        <Main />
        <Footer />

        <div className="popup popup_transparent_medium" id="editProfile">
          <div className="popup__container">
            <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
            <form name="editProfile" className="popup__form" noValidate>
              <h2 className="popup__form-title">Редактировать профиль</h2>
              <input id="popup__profile-name-input" type="text" name="profileName"
              className="popup__form-text" placeholder="Жак-Ив Кусто" minLength="2" maxLength="40" required="required" />
              <span className="popup__profile-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
              <input id="popup__profile-description-input" type="text" name="profileDescription"
              className="popup__form-text" placeholder="Исследователь океана" minLength="2" maxLength="200" required="required" />
              <span className="popup__profile-description-input-error popup__form-text-error">Вы пропустили это поле.</span>
              <button className="popup__form-submit-btn popup__form-submit-btn_disabled" disabled="disabled" type="submit">Сохранить</button>
            </form>
          </div>
        </div>
        <div className="popup popup_transparent_medium" id="addPlace">
          <div className="popup__container">
            <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
            <form name="addPlace" className="popup__form" noValidate>
              <h2 className="popup__form-title">Новое место</h2>
              <input id="popup__place-name-input" type="text" name="placeName"
              className="popup__form-text" placeholder="Название" minLength="2" maxLength="30" required="required" />
              <span className="popup__place-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
              <input id="popup__place-url-input" type="url" name="placeUrl" className="popup__form-text" placeholder="Ссылка на картинку" required="required" />
              <span className="popup__place-url-input-error popup__form-text-error">Введите адрес сайта.</span>
              <button className="popup__form-submit-btn popup__form-submit-btn_disabled" disabled="disabled" type="submit">Создать</button>
            </form>
          </div>
        </div>
        <div className="popup popup_transparent_medium" id="editAvatar">
          <div className="popup__container">
            <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
            <form name="editAvatar" className="popup__form" noValidate>
              <h2 className="popup__form-title">Обновить аватар</h2>
              <input id="popup__profile-avatar-url-input" type="url" name="avatarUrl" className="popup__form-text" placeholder="Ссылка на аватар" required="required" />
              <span className="popup__profile-avatar-url-input-error popup__form-text-error">Введите адрес аватара.</span>
              <button className="popup__form-submit-btn popup__form-submit-btn_disabled" disabled="disabled" type="submit">Сохранить</button>
            </form>
          </div>
        </div>
        <div className="popup popup_transparent_medium" id="confirmDelete">
          <div className="popup__container">
            <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
            <form name="confirmDelete" className="popup__form">
              <h2 className="popup__form-title popup__form-title_onlytitle">Вы уверены?</h2>
              <button className="popup__form-submit-btn" type="submit">Да</button>
            </form>
          </div>
        </div>
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
