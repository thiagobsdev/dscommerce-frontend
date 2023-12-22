import "./styles.css"

type Props = {
    texto: string
}

export default function BtnBranco ({texto}: Props) {
    return (
        <div className="dsc-btn dsc-btn-white">
        {texto}
        </div>
    )
}