import { popupConfig } from "../utils/constants";
import { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

  const [cardName, setCardName] = useState('');
  const [cardUrl, setCardUrl] = useState('');

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardUrlChange = (e) => {
    setCardUrl(e.target.value);
  }

  const handleSubmit = (evt) => {
    props.onAddPlace(evt, {name: cardName, link: cardUrl});
    setCardName('');
    setCardUrl('');
  };

  return (
    <PopupWithForm name={popupConfig.profileAddPopupAndFormName} formTitle="Новое место" submitButtonText="Создать" isOpen={props.isOpen}
        onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="popup__place-name-input" type="text" name="placeName"
        className="popup__form-text" placeholder="Название" minLength="2" maxLength="30" required="required" value={cardName} onChange={handleCardNameChange} />
      <span className="popup__place-name-input-error popup__form-text-error">Вы пропустили это поле.</span>
      <input id="popup__place-url-input" type="url" name="placeUrl" className="popup__form-text" placeholder="Ссылка на картинку"
       required="required" value={cardUrl} onChange={handleCardUrlChange} />
      <span className="popup__place-url-input-error popup__form-text-error">Введите адрес сайта.</span>
    </PopupWithForm>
  );
}
