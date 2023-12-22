import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Catalog from "./routes/HomeClient/Catalog/Index";
import ProdutosDetalhes from "./routes/HomeClient/ProdutosDetalhes/Index";
import HomeClient from "./routes/HomeClient/Index";
import Cart from "./routes/HomeClient/Cart/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeClient />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="details/:productId" element={<ProdutosDetalhes />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
