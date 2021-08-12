import {useEffect, useState, useCallback, useMemo} from 'react';
import { api } from '../utils/Api.js';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {

  const emptyCard = useMemo (() => ({link: '', name: '', likes: [], _id: '', createdAt: '', owner: ''}), []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [cardToDelete, setCardToDelete] = useState(emptyCard);

  //context state variables
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: '', cohort: ''});
  const [cards, setCards] = useState([]);

  const closeAllPopups = useCallback (() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(emptyCard);
    setCardToDelete(emptyCard);
  }, [emptyCard]);

  useEffect(() => {
    //get api data on mount in parallel and put it in react state variables
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
      setCurrentUser(info);
      setCards(cards);
    })
    .catch(err => {console.log(err)});
  }, []);

  useEffect(() => {
    if (confirmDelete) {
      api.deleteCard(cardToDelete._id)
      .then(res => {
        setConfirmDelete(false);
        const newCards = cards.filter(c => c._id !== cardToDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(err));
    }
  }, [confirmDelete, cardToDelete._id, cards, closeAllPopups]);


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
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
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
      const newCards = [card, ...cards];
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => {console.log(err)});
  };

  const handleConfirmDeleteSubmit = (evt) => {
    evt.preventDefault();
    setConfirmDelete(true);
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
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleConfirmDeleteSubmit} />
      </div>
    </CurrentUserContext.Provider>
  );
}
