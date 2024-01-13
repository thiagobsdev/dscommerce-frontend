import { Link, useNavigate, useParams } from "react-router-dom";
import BtnBranco from "../../../components/BtnBranco/Index";
import "./styles.css";
import { useEffect, useState } from "react";
import FormInput from "../../../components/FormInput/Index";
import * as forms from "../../../utils/forms";
import * as productService from "../../../services/product-services";
import * as categorieService from "../../../services/category-service";
import FormTextArea from "../../../components/FormTextArea/Index";
import { CategoriesDTO } from "../../../models/category";
import FormSelect from "../../../components/FormSelect/Index";
import { selectStyles } from "../../../utils/select";

export default function ProductForm() {
  const params = useParams();

  const isEditing = params.productId !== "create";

  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoriesDTO[]>([]);

  useEffect(() => {
    categorieService.findAllRequest().then((response) => {
      setCategories(response.data);
    });
  }, []);

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
      validation: function (tamanhoNome: string) {
        return /^.{3,80}$/.test(tamanhoNome);
      },
      message: "Favor informar um nome de produto de 03 à 80 caracteres",
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
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (tamanhoNome: string) {
        return /^.{10,}$/.test(tamanhoNome);
      },
      message: "A descrição deve ter no minimo dez caracteres",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function (value: CategoriesDTO[]) {
        return value.length > 0;
      },
      message: "Selecione ao menos uma categoria",
    },
  });

  function handleChangeInput(event: any) {
    const result = forms.updateAndValidate(
      formData,
      event.target.name,
      event.target.value
    );
    setFormData(result);
  }

  function handleTurnDirty(name: string) {
    const newFormData = forms.dirtyAndValidate(formData, name);
    setFormData(newFormData);
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const formDataValidated = forms.dirtyAndValidadeAll(formData);
    if (forms.hasAnyInvalid(formDataValidated)) {
      //setFormData(formDataValidated);
      //return;
    }

    const requestBody = forms.toValues(formData);

    if (isEditing) {
      requestBody.id = params.productId;
    }

    const request = isEditing
      ? productService.updateRequest(requestBody)
      : productService.insertRequest(requestBody);

    request.then(() => {
      navigate("/admin/products");
    })
    .catch( error => {
      const newInputs = forms.setBackendErrors(formData, error.response.data.errors)
      setFormData(newInputs)
    });
  }

  return (
    <main>
      <section id="product-form-section" className="dsc-container">
        <div className="dsc-product-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
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
              <div>
                <FormSelect
                  {...formData.categories}
                  className="dsc-form-control dsc-select-conteiner"
                  options={categories}
                  styles={selectStyles}
                  onTurnDirty={handleTurnDirty}
                  isMulti
                  onChange={(obj: any) => {
                    const newFormData = forms.updateAndValidate(
                      formData,
                      "categories",
                      obj
                    );
                    setFormData(newFormData);
                  }}
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
                <div className="dsc-form-error ">
                  {formData.categories.message}
                </div>
              </div>
              <div>
                <FormTextArea
                  {...formData.description}
                  onTurnDirty={handleTurnDirty}
                  className="dsc-form-control dsc-textarea"
                  onChange={handleChangeInput}
                />
                <div className="dsc-form-error dsc-textarea">
                  {formData.description.message}
                </div>
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
