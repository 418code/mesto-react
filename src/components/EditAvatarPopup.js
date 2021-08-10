import { popupConfig } from "../utils/constants";
import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  };

  return (
    <PopupWithForm name={popupConfig.profileAvatarEditPopupAndFormName} formTitle="Обновить аватар" submitButtonText="Сохранить" isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} id="popup__profile-avatar-url-input" type="url" name="avatarUrl" className="popup__form-text" placeholder="Ссылка на аватар"
       required="required" />
      <span className="popup__profile-avatar-url-input-error popup__form-text-error">Введите адрес аватара.</span>
    </PopupWithForm>
  );
}
