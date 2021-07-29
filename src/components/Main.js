export default function Main() {
  return (
    <main className="content body__element">
      <section className="profile body__element">
        <div className="profile__pic-info-container">
          <div className="profile__pic-container">
            <img src="http://" alt="фото аккаунта" className="profile__pic" />
            <button className="profile__avatar-edit-button transparent transparent_amount_much-more"></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit-wrap">
              <h1 className="profile__name"></h1>
              <button className="profile__edit-button transparent transparent_amount_more" type="button" aria-label="Кнопка редактирования профиля"></button>
            </div>
            <p className="profile__description"></p>
          </div>
        </div>
        <button className="profile__add-button transparent transparent_amount_more" type="button" aria-label="Кнопка добавления карточки места"></button>
      </section>
      <section className="places body__element">
        <ul className="places__list body__element">
        </ul>
      </section>
    </main>
  );
}
