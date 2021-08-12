import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./ContainerLogin.css";
import StoreContext from "StoreContext";
import axios from "axios";

function initialState() {
  return { user: "", password: "" };
}

const ContainerLogin = ({ user }) => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  function login( form, bd ) {
    console.log(bd);
    console.log(form);
    if (form.user === bd.user && form.password === bd.password) {
      return { token: "1234" };
    }
    setError("Usuário ou senha inválida");
    return { error: "Usuário ou senha inválida" };
  }

  function onSubmit(event) {
    event.preventDefault();
    
    axios
      .get("http://localhost:5000/usuarios?user=" +values.user )
      .then(function (response) {
        // handle success
        const bd = response.data[0]
        
        const { token } = login(values,bd);

        if (token) {
          setToken(token);
          return history.push("/");
        }
        console.log(error);
        setValues(initialState);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setValues(initialState);
      })
    

    
  }

  return (
    <div className="ContainerLogin_main">
      <div className="ContainerLogin_containerImg">
        <img
          className="ContainerLogin_img"
          src="http://www.appis.com.br/img/APPIS_LOGO_COR2.png"
        ></img>
      </div>

      <div className="ContainerLogin_form">
        <form onSubmit={onSubmit}>
          <input
            className="ContainerLogin_formInput"
            type="input"
            placeholder="Usuário"
            name="user"
            id="user"
            onChange={onChange}
            value={values.user}
          />
          <input
            className="ContainerLogin_formInput"
            type="password"
            placeholder="Senha"
            name="password"
            id="password"
            onChange={onChange}
            value={values.password}
          />
          <button className="ContainerLogin_formButton" type="submit">
            {" "}
            Entrar
          </button>
        </form>
      </div>
      {error && <div className="user-login__error">{error}</div>}
      <div className="ContainerLogin_info">
        <a
          className="ContainerLogin_link"
          target="_blank"
          href="http://www.appis.com.br/index.html#somos"
        >
          Esqueci a senha
        </a>
        <a
          className="ContainerLogin_link"
          target="_blank"
          href="http://www.appis.com.br/index.html#faleconosco"
        >
          Contato de Suporte
        </a>
      </div>
    </div>
  );
};

export default ContainerLogin;
