export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} popup_transparent_medium`}>
      <div className="popup__container">
        <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"></button>
        <form name={props.name} className="popup__form" noValidate>
          <h2 className="popup__form-title">{props.formTitle}</h2>
          {props.children}
          <button className="popup__form-submit-btn" type="submit">{props.submitButtonText}</button>
        </form>
      </div>
    </div>
  );
}
