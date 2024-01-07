import BtnAzul from "../BtnAzul/Index";
import BtnBranco from "../BtnBranco/Index";
import "./styles.css";

type Props = {
    id: number,
    message: string,
    onDialogConfirmationAnswer: Function,
}

export default function DialogConfirmation( {id, message,onDialogConfirmationAnswer}: Props) {
  return (
    <div className="dsc-dialog-backgroud" onClick={ () => onDialogConfirmationAnswer(false, id)}>
      <div className="dsc-dialog-box" onClick={ (event) => event.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container">
            <div onClick={() => onDialogConfirmationAnswer(true, id)}>
              <BtnAzul texto="SIM" />
            </div>
            <div onClick={() => onDialogConfirmationAnswer(false, id)}>
              <BtnBranco texto="NÃO" />
            </div>
        </div>
      </div>
    </div>
  );
}
