import { useContext, useState } from "react";
import "./styles.css";
import * as authService from "../../../services/auth-service";
import * as forms from "../../../utils/forms"
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../../utils/context-token";
import FormInput from "../../../components/FormInput/Index";

export default function Login() {
  const navigate = useNavigate();
  const { setContextTokenPayload } = useContext(ContextToken);

  const [formData, setFormData] = useState<any>({
    username: {
      value: "",
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value.toLowerCase()
        );
      },
      message: "Favor informar um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
    },
  });

  function handleFormLogin(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(forms.update(formData, name,value));
  }

  function handleLogin(event: any) {
    event.preventDefault();
    authService
      .loginRequest(forms.toValues(formData))
      .then((response) => {
        authService.saveAccessToken(response.data.access_token);
        setContextTokenPayload(authService.getAccessTokenPayload());
        navigate("/cart");
      })
      .catch((error) => {
        console.log("ERRO NA REQUISIÇÃO", error);
        console.log(formData)
      });
  }

  return (
    <main>
      <section id="login-section" className="dsc-container">
        <div className="dsc-login-form-container">
          <form className="dsc-card dsc-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="dsc-form-controls-container">
              <div>
                <FormInput
                  {...formData.username}
                  placeholder="Email"
                  className="dsc-form-control"
                  onChange={handleFormLogin}
                />
                <div className="dsc-form-error"></div>
              </div>
              <div>
                <FormInput
                   {...formData.password}
                  className="dsc-form-control"
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
