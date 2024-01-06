import BtnAzul from "../BtnAzul/Index";
import "./styles.css";

export default function DialogInfo() {
  return (
    <div className="dsc-dialog-backgroud">
      <div className="dsc-dialog-box" >
        <h2>Operação com sucesso</h2>
        <BtnAzul texto="OK" />
      </div>
    </div>
  );
}
