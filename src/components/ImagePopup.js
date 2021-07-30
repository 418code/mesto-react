export default function ImagePopup() {
  return (
    <div className="popup popup_type_show-image popup_transparent_slightly">
        <div className="popup__container">
          <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
          <img src="#" alt="#" className="popup__photo" />
          <p className="popup__photo-description"></p>
        </div>
    </div>
  );
}
