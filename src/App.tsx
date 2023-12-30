import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Catalog from "./routes/HomeClient/Catalog/Index";
import ProdutosDetalhes from "./routes/HomeClient/ProdutosDetalhes/Index";
import HomeClient from "./routes/HomeClient/Index";
import Cart from "./routes/HomeClient/Cart/Index";
import Login from "./routes/HomeClient/Login/Index";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeClient />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="details/:productId" element={<ProdutosDetalhes />} />
          </Route>
          <Route path="/admin/" element={<Admin />} >
            <Route index element={<AdminHome />} />

          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
