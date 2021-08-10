import {useEffect, useState} from 'react';
import { api } from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {popupConfig} from '../utils/constants.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {

  const emptyCard = {link: '', name: ''};

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard);

  //context state variables
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    //get api data on mount in parallel and put it in react state variables
    api.getUserInfo()
    .then(info => {
      setCurrentUser(info);
    })
    .catch(err => {console.log(err)});
  }, []);


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUserUpdate = ({name, about}) => {
    api.setUserInfo({name, about})
    .then(info => {
      setCurrentUser(info);
      closeAllPopups();
    })
    .catch(err => {console.log(err)});
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(emptyCard);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page body__element">
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} />
          <PopupWithForm name={popupConfig.profileAddPopupAndFormName} formTitle="Новое место" submitButtonText="Создать" isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}>
            <input id="popup__place-name-input" type="text" name="placeName"
              className="popup__form-text" placeholder="Название" minLength="2" maxLength="30" required="required" />
            <span className="popup__place-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
            <input id="popup__place-url-input" type="url" name="placeUrl" className="popup__form-text" placeholder="Ссылка на картинку" required="required" />
            <span className="popup__place-url-input-error popup__form-text-error">Введите адрес сайта.</span>
          </PopupWithForm>
          <PopupWithForm name={popupConfig.profileAvatarEditPopupAndFormName} formTitle="Обновить аватар" submitButtonText="Сохранить" isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}>
            <input id="popup__profile-avatar-url-input" type="url" name="avatarUrl" className="popup__form-text" placeholder="Ссылка на аватар" required="required" />
            <span className="popup__profile-avatar-url-input-error popup__form-text-error">Введите адрес аватара.</span>
          </PopupWithForm>
          <PopupWithForm name={popupConfig.cardConfirmDeletePopupAndFormName} formTitle="Вы уверены?" submitButtonText="Да" isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}
