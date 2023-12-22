import "./styles.css";
import BtnAzul from "../../../components/BtnAzul/Index";
import BtnBranco from "../../../components/BtnBranco/Index";
import DetalheProduto from "../../../components/DetalheProduto/Index";
import * as productService from "../../../services/product-services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";



export default function ProdutosDetalhes() {
  let params = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO>();

 useEffect ( ()=> {
   productService.findById(Number(params.productId))
          .then(response => {
            setProduct(response.data)
          })
          .catch(() => {
            navigate("/");
          })

 } ,[] )

 
  return (
    <main>
      <section id="product-details-section" className="dsc-container">
        {product && (
          <div className="dsc-card dsc-mb20">
            <div className="dsc-product-details-top dsc-line-bottom">
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="dsc-product-details-bottom">
              <DetalheProduto product={product} />
            </div>
          </div>
        )}

        <div className="dsc-btn-page-container">
          <BtnAzul texto="Comprar" />
          <Link to="/">
            <BtnBranco texto="Início" />
          </Link>
        </div>
      </section>
    </main>
  );
}
