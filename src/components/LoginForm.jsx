import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const baseURL = "http://localhost:3001/users";
const cookies = new Cookies();

const LoginForm = () => {
  const navigate = useNavigate();

  let initialCredentials = {
    form: {
      UserName: "",
      UserRole: "",
      Password: "",
    },
  };

  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    setCredentials({
      form: { ...initialCredentials, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get(baseURL, {
        params: {
          username: credentials.form.UserName,
          password: md5(credentials.form.Password),
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          let respuesta = response[0];
          cookies.set("UserName", respuesta.username, { path: "/" });
          cookies.set("UserRole", respuesta.role, { path: "/" });
          navigate("/agenda", { redirect: true });

          alert(`Bienvenido/a ${respuesta.username}`);
        } else {
          alert("Usuario o Contraseña incorrectos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (cookies.get("UserName")) {
      navigate("/agenda");
    }
  });

  return (
    <div id="formContainer" className="col-md-4 mx-auto mt-3">
      <h2 className="title2 text-info mb-4">Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            placeholder="Nombre de usuario"
            type="text"
            className="form-control text-info"
            name="UserName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select text-info"
            id="UserRole"
            name="UserRole"
            onChange={handleChange}
            required
          >
            <option value="Opciones">Selecciona una opción de usuario</option>
            <option value="Usuario">Usuario</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            placeholder="Contraseña"
            type="password"
            className="form-control text-info"
            name="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-info">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
