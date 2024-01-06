import { useContext, useState } from "react";
import "./styles.css";
import { CredentialsDTO } from "../../../models/auth";
import * as authService from "../../../services/auth-service"
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token";


export default function Login() {

  const navigate = useNavigate()
  const {setContextTokenPayload} = useContext(ContextToken)

  const [formData, setFormData] = useState<CredentialsDTO>({
    username: "",
    password: "",
  });

  function handleFormLogin(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleLogin(event: any) {
    event.preventDefault();
    authService.loginRequest(formData)
        .then( response => {
          authService.saveAccessToken(response.data.access_token)
          setContextTokenPayload(authService.getAccessTokenPayload())
          navigate("/cart")
        })
        .catch( error => { 
          console.log("ERRO NA REQUISIÇÃO", error)
        })
  }

  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <input
                  className="dsc-form-control"
                  name="username"
                  value={formData.username}
                  type="text"
                  placeholder="Email"
                  onChange={handleFormLogin}
                />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <input
                  className="dsc-form-control"
                  name="password"
                  value={formData.password}
                  type="password"
                  placeholder="Senha"
                  onChange={handleFormLogin}
                />
              </div>
            </div>

            <div className="dsc-login-form-buttons dsc-mt20">
              <button type="submit" className="dsc-btn dsc-btn-blue">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
