import Card from './Card';
import { api } from '../utils/Api';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function Main(props) {

  //subscribe to context
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
    .then(cards => {
      setCards(cards);
    })
    .catch(err => {console.log(err)});
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map(c => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(err => {console.log(err)});
  }

  return (
    <main className="content body__element">
      <section className="profile body__element">
        <div className="profile__pic-info-container">
          <div className="profile__pic-container">
            <img src={currentUser.avatar} alt="фото аккаунта" className="profile__pic" />
            <button className="profile__avatar-edit-button transparent transparent_amount_much-more"
                    type="button" aria-label="Кнопка редактирования аватара" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit-wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button transparent transparent_amount_more"
                      type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button transparent transparent_amount_more"
                type="button" aria-label="Кнопка добавления карточки места" onClick={props.onAddPlace}></button>
      </section>
      <section className="places body__element">
        <ul className="places__list body__element">
          {cards.map(card => <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} />)}
        </ul>
      </section>
    </main>
  );
}
