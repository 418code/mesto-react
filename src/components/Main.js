import { api } from '../utils/Api.js';
import { useState, useEffect } from 'react';

export default function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('http://');

  useEffect(() => {
    api.getUserInfo()
    .then(info => {
      setUserName(info.name);
      setUserDescription(info.about);
      setUserAvatar(info.avatar);
    })
    .catch(err => {console.log(err)});
  });

  return (
    <main className="content body__element">
      <section className="profile body__element">
        <div className="profile__pic-info-container">
          <div className="profile__pic-container">
            <img src={userAvatar} alt="фото аккаунта" className="profile__pic" />
            <button className="profile__avatar-edit-button transparent transparent_amount_much-more" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit-wrap">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button transparent transparent_amount_more"
                      type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button transparent transparent_amount_more"
                type="button" aria-label="Кнопка добавления карточки места" onClick={props.onAddPlace}></button>
      </section>
      <section className="places body__element">
        <ul className="places__list body__element">
        </ul>
      </section>
    </main>
  );
}
