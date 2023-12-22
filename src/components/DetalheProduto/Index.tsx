import { ProductDTO } from "../../models/product";
import TagCategory from "../TagCategory/Index";
import "./styles.css";

type Props = {
    product: ProductDTO
}

export default function DetalheProduto({product}: Props) {
  return (
    <>
      <h3> R$ {product.price}</h3>
      <h4>{product.name}</h4>
      <p>
        {product.description}
      </p>
      <div className="dsc-category-container">
                {product.categories.map (item => {
                  return (
                    <TagCategory key={item.id} texto={item.name} />
                  );
                })}
              </div>
    </>
  );
}
