import {useEffect, useState} from 'react';
import { api } from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
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
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: '', cohort: ''});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    //get api data on mount in parallel and put it in react state variables
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
      setCurrentUser(info);
      setCards(cards);
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map(c => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(res => {
      const newCards = cards.filter(c => c._id != card._id);
      setCards(newCards);
    })
    .catch(err => console.log(err));
  }

  const handleUserUpdate = ({name, about}) => {
    api.setUserInfo({name, about})
    .then(info => {
      setCurrentUser(info);
      closeAllPopups();
    })
    .catch(err => {console.log(err)});
  };

  const handleAvatarUpdate = ({avatar}) => {
    api.setUserAvatar(avatar)
    .then(res => {
      const userInfo = {...currentUser};
      userInfo.avatar = avatar;
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => {console.log(err)});
  };

  const handleAddPlaceSubmit = (evt, {name, link}) => {
    evt.preventDefault();

    api.addCard({name, link})
    .then(card => {
      const newCards = [...cards, card];
      setCards(newCards);
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
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} />
          <PopupWithForm name={popupConfig.cardConfirmDeletePopupAndFormName} formTitle="Вы уверены?" submitButtonText="Да" isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}
