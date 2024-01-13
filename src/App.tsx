import { Navigate, Route, Routes } from "react-router-dom";
import Catalog from "./routes/HomeClient/Catalog/Index";
import ProdutosDetalhes from "./routes/HomeClient/ProdutosDetalhes/Index";
import HomeClient from "./routes/HomeClient/Index";
import Cart from "./routes/HomeClient/Cart/Index";
import Login from "./routes/HomeClient/Login/Index";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { AccessTokenPayloadDTO } from "./models/auth";
import { ContextToken } from "./utils/context-token";
import * as authService from "./services/auth-service"
import ProductListing from "./routes/Admin/ProductListing";
import ProductForm from "./routes/Admin/ProductForm";
import { ContextCartCount } from "./utils/context-cart";

function App() {
  const [contextTokenPayload, setContextTokenPayload] =
    useState<AccessTokenPayloadDTO>();

    const [contextCartCount, setContextCartCount] = useState<number>(0)

    useEffect(() => {
      if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
      }
      }, []);

  return (
    <>
      <ContextToken.Provider
        value={{ contextTokenPayload, setContextTokenPayload }}
      >
      <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}} >  
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<HomeClient />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="details/:productId" element={<ProdutosDetalhes />} />
            </Route>
            <Route
              path="/admin/"
              element={
                <PrivateRoute roles={["ROLE_ADMIN"]}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/admin/home"  />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="products" element={<ProductListing />} />
              <Route path="products/:productId" element={<ProductForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>  
      </ContextToken.Provider>
    </>
  );
}

export default App;
