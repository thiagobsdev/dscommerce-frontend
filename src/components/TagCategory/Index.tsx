import "./styles.css"


type Props = {
    texto: string;
  }

export default function TagCategory ({texto}: Props) {
    return (
        <div className="dsc-category">
            {texto}
        </div>
    )
}