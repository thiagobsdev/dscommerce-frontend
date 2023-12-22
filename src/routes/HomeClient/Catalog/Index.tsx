import "./styles.css";

import CarregarMais from "../../../components/CarregarMais/Index";
import Pesquisar from "../../../components/Pesquisar/Index";
import Card_Item_Catalog from "../../../components/Cart_Item_Catalog/Index";
import * as productService from "../../../services/product-services";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import { useNavigate } from "react-router-dom";


export default function Catalog() {

  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductDTO[]>([]);

 useEffect ( ()=> {
  productService.findAll()
          .then(response => {
            setProducts(response.data.content)
          })
          .catch(() => {
            navigate("/");
          })
 } ,[] )

  return (
    <main>
      <section id="catalog-section" className="dsc-container">
        <Pesquisar />

        <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
          {products.map((item) => {
            return <Card_Item_Catalog key={item.id} product={item} />;
          })}
        </div>
        <CarregarMais />
      </section>
    </main>
  );
}
