import "./styles.css";

import CarregarMais from "../../../components/CarregarMais/Index";
import Pesquisar from "../../../components/Pesquisar/Index";
import Card_Item_Catalog from "../../../components/Cart_Item_Catalog/Index";
import * as productService from "../../../services/product-services";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import { useNavigate } from "react-router-dom";

type QueryParams = {
  page: number;
  size: number;
  name: string;
  sort: string;
};

export default function Catalog() {
  
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [lastPageProducts, setLastPageProducts] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
    size: 12,
    sort: "name",
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

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <Pesquisar onSearch={handleSearch} />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {products.map((item) => {
            return <Card_Item_Catalog key={item.id} product={item} />;
          })}
        </div>
        {!lastPageProducts && (
          <div onClick={handleNextPage}>
            <CarregarMais />
          </div>
        )}
      </section>
    </main>
  );
}
