
import "./styles.css"

export default function Pesquisar () {
    return (
        <form className="dsc-search-bar">
          <button type="submit">🔎︎</button>
          <input type="text" placeholder="Nome do produto" />
          <button type="reset">🗙</button>
        </form>
    );
}