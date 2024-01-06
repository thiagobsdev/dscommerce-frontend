import BtnAzul from "../BtnAzul/Index";
import "./styles.css";

type Props = {
    message: string,
    dialogFunction: Function
}

export default function DialogInfo( {message,dialogFunction}: Props) {
  return (
    <div className="dsc-dialog-backgroud" onClick={ () => dialogFunction()}>
      <div className="dsc-dialog-box" onClick={ (event) => event.stopPropagation()}>
        <h2>{message}</h2>
        <div className="dsc-dialog-btn-container" onClick={ () => dialogFunction()}>
            <BtnAzul texto="OK" />
        </div>
      </div>
    </div>
  );
}
