import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token";

export function LoggedUser() {
  const { contextTokenPayload, setContextTokenPayload } =
    useContext(ContextToken);

  function handleLogout() {
    authService.logout();
    setContextTokenPayload(undefined);
  }

  return authService.isAuthenticated() ? (
    <div className="dsc-logged-user">
      <p>{contextTokenPayload?.user_name}</p>
      <Link onClick={handleLogout} to="/catalog">
        Sair
      </Link>
    </div>
  ) : (
    <Link to="/login">Entrar</Link>
  );
}
