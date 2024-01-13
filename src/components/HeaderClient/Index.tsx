import "./styles.css";

import { Link } from "react-router-dom";
import * as authService from "../../services/auth-service";
import iconAdmin from "../../assets/adminIcon.svg";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token";
import { LoggedUser } from "../LoggedUser";
import CartIcon from "../CartIcon/Index";

export default function HeaderClient() {
  const { contextTokenPayload } = useContext(ContextToken);

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DSC</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            {contextTokenPayload && authService.hasAnyRoles(["ROLE_ADMIN"]) && (
              <Link to="/admin">
                <div className="dsc-menu-item">
                  <img src={iconAdmin} alt="Admin" />
                </div>
              </Link>
            )}
            <div className="dsc-menu-item">
              <Link to="/cart">
                <CartIcon />
              </Link>
            </div>
          </div>
          <LoggedUser />
        </div>
      </nav>
    </header>
  );
}
