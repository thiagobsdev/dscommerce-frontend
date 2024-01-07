import "./styles.css";

import editIcon from "../../../assets/Edit.svg";
import trashIcon from "../../../assets/Trash.svg";

import * as productService from "../../../services/product-services";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import { useNavigate } from "react-router-dom";
import Pesquisar from "../../../components/Pesquisar/Index";
import CarregarMais from "../../../components/CarregarMais/Index";
import DialogInfo from "../../../components/DialogInfo/Index";
import DialogConfirmation from "../../../components/DialogConfirmation/Index";
import BtnBranco from "../../../components/BtnBranco/Index";

type QueryParams = {
  page: number;
  size: number;
  name: string;
  sort: string;
};

export default function ProductListing() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [lastPageProducts, setLastPageProducts] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
    size: 12,
    sort: "name",
  });

  const [dialogInfoData, setDialogInfoData] = useState({
    message: "Operação com sucesso",
    visible: false,
  });

  const [dialogConfirmationAnswer, setDialogConfirmationAnswer] = useState({
    message: "Tem certeza ?",
    visible: false,
    id: 0,
  });

  useEffect(() => {
    productService
      .findRequestPage(queryParams.page, queryParams.name)
      .then((response) => {
        const nextPage = response.data.content;
        setLastPageProducts(response.data.last);
        setProducts(products.concat(nextPage));
      })
      .catch(() => {
        navigate("/");
      });
  }, [queryParams]);

  function handleSearch(nameFounded: string) {
    setProducts([]);
    setQueryParams({ ...queryParams, page: 0, name: nameFounded });
  }

  function handleNextPage() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handleDialogClose() {
    setDialogInfoData({ ...dialogInfoData, visible: false });
  }

  function handleConfirmationVisibleTrue(productId: number) {
    setDialogConfirmationAnswer({
      ...dialogConfirmationAnswer,
      id: productId,
      visible: true,
    });
  }

  function handleDialogConfirmation(answer: boolean, productId: number) {
    if (answer) {
      productService
        .deleteById(productId)
        .then(() => {
          setProducts([]);
          setQueryParams({ ...queryParams, page: 0 });
        })
        .catch((error) => {
          setDialogInfoData({
            visible: true,
            message: error.response.data.error,
          });
        });
    }

    setDialogConfirmationAnswer({
      ...dialogConfirmationAnswer,
      visible: false,
    });
  }

  function handleCreateNewProduct () {
    navigate("/admin/products/create")
  }

  return (
    <main>
      <section id="product-listing-section" className="dsc-container">
        <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>

        <div className="dsc-btn-page-container dsc-mb20">
          <div onClick={handleCreateNewProduct}>
            <BtnBranco texto="Novo" />
          </div>
        </div>

        <Pesquisar onSearch={handleSearch} />

        <table className="dsc-table dsc-mb20 dsc-mt20">
          <thead>
            <tr>
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="dsc-tb576">{item.id}</td>
                  <td>
                    <img
                      className="dsc-product-listing-image"
                      src={item.imgUrl}
                      alt={item.name}
                    />
                  </td>
                  <td className="dsc-tb768">{`R$ ${item.price}`}</td>
                  <td className="dsc-txt-left">{item.name}</td>
                  <td>
                    <img
                      className="dsc-product-listing-btn"
                      src={editIcon}
                      alt="Editar"
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => handleConfirmationVisibleTrue(item.id)}
                      className="dsc-product-listing-btn"
                      src={trashIcon}
                      alt="Deletar"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!lastPageProducts && (
          <div onClick={handleNextPage}>
            <CarregarMais />
          </div>
        )}
      </section>

      {dialogInfoData.visible && (
        <DialogInfo
          message={dialogInfoData.message}
          dialogFunction={handleDialogClose}
        />
      )}

      {dialogConfirmationAnswer.visible && (
        <DialogConfirmation
          id={dialogConfirmationAnswer.id}
          message={dialogConfirmationAnswer.message}
          onDialogConfirmationAnswer={handleDialogConfirmation}
        />
      )}
    </main>
  );
}
