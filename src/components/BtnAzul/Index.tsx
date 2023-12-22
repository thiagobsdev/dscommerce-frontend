
import "./styles.css"

type Props = {
    texto: string;
  }

export default function BtnAzul ({texto} : Props) {
    return (
        <div className="dsc-btn dsc-btn-blue">
             {texto}
        </div>
    );
}