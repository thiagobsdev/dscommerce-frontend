import { Link, useParams } from "react-router-dom";
import BtnBranco from "../../../components/BtnBranco/Index";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/Index";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-services";

export default function ProductForm() {
  const params = useParams();

  const isEditing = params.productId !== "create";

  useEffect(() => {
    if (isEditing) {
      productService.findById(Number(params.productId)).then((response) => {
        setFormData(forms.updateAll(formData, response.data));
      });
    }
  }, []);

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome do produto",
      validation: function(tamanhoNome: string ) {
        return  /^.{6,7}$/.test(tamanhoNome)
      },
      message: "Favor informar um nome de produto de 03 à 80 caracteres"
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço do produto",
      validation: function (valorValidado: any) {
        return Number(valorValidado) > 0;
      },
      message: "Favor informar um valor positivo",
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
    const result = forms.updateAndValidate(formData, event.target.name, event.target.value )
    setFormData(result);
  }

  function handleTurnDirty (name: string) {
      const newFormData = forms.dirtyAndValidate(formData, name);
      setFormData(newFormData);
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
                  onTurnDirty={handleTurnDirty}
                  className="dsc-form-control"
                  onChange={handleChangeInput}
                />
                <div className="dsc-form-error">{formData.name.message}</div>
              </div>
              <div>
                <FormInput
                  {...formData.price}
                  onTurnDirty={handleTurnDirty}
                  className="dsc-form-control"
                  onChange={handleChangeInput}
                />
                 <div className="dsc-form-error">{formData.price.message}</div>
              </div>
              <div>
                <FormInput
                  {...formData.imgUrl}
                  onTurnDirty={handleTurnDirty}
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
