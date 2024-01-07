import BtnAzul from "../BtnAzul/Index";
import BtnBranco from "../BtnBranco/Index";
import "./styles.css";

type Props = {
    message: string,
    onDialogConfirmationAnswer: Function
}

export default function DialogConfirmation( {message,onDialogConfirmationAnswer}: Props) {
  return (
    <div className="dsc-dialog-backgroud" onClick={ () => onDialogConfirmationAnswer(false)}>
      <div className="dsc-dialog-box" onClick={ (event) => event.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container">
            <div onClick={() => onDialogConfirmationAnswer(true)}>
              <BtnAzul texto="SIM" />
            </div>
            <div onClick={() => onDialogConfirmationAnswer(false)}>
              <BtnBranco texto="NÃO" />
            </div>
        </div>
      </div>
    </div>
  );
}
