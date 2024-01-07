import { Link, useParams } from "react-router-dom";
import BtnBranco from "../../../components/BtnBranco/Index";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/Index";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-services"

export default function ProductForm() {

  const params = useParams();

  const isEditing = params.productId !== "create";

  useEffect(()=> {
    if( isEditing) {
      productService.findById(Number(params.productId))
        .then( response => {
            setFormData(forms.updateAll(formData, response.data))
        })
    }
  },[] )

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome do produto",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço do produto",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Imagem do produto",
    },
  });

  function handleChangeInput(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(forms.update(formData, name, value));
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form">
            <h2>Dados do produto</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  {...formData.name}
                  className="dsc-form-control"
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <FormInput
                  {...formData.price}
                  className="dsc-form-control"
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <FormInput
                  {...formData.imgUrl}
                  className="dsc-form-control"
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <div className="dsc-product-form-buttons">
              <Link to={"/admin/products"}>
                <BtnBranco texto="Cancelar" />
              </Link>
              <button type="submit" className="dsc-btn dsc-btn-blue">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
