export default function Card(props) {
  return (
    <li className="place">
      <button className="place__remove-btn transparent transparent_amount_more" type="button" aria-label="Кнопка удаления карточки места"></button>
      <img src={props.card.link} alt={`Фото ${props.card.name}`} className="place__photo flip" />
      <h2 className="place__name">{props.card.name}</h2>
      <button className="place__like-btn transparent transparent_amount_less" type="button" aria-label="Кнопка лайк сердечко карточки места"></button>
      <p className="place__number-of-likes">{props.card.likes.length}</p>
    </li>
  );
}
