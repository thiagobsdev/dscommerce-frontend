
import { useState } from "react";
import "./styles.css"

type Props = {
  onSearch : Function;
}


export default function Pesquisar ({onSearch} : Props) {

  const[ inputNameText, setInputNameTex] = useState("");

  function handleInputvalue (event: any) {
        setInputNameTex(event.target.value)
  }

  function handleSubmitNameText (event: any) {
        event.preventDefault();
        onSearch(inputNameText)
  }

  function handleResetButton () {
    setInputNameTex("");
    onSearch(inputNameText)
  }
    return (
        <form className="dsc-search-bar" onSubmit={handleSubmitNameText}>
          <button type="submit">🔎︎</button>
          <input 
            type="text"
            value={inputNameText} 
            placeholder="Nome do produto"
            onChange ={handleInputvalue}
             />
          <button onClick={handleResetButton} >🗙</button>
        </form>
    );
}