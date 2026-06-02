import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem(
        "access",
        response.data.access
      );

      const meResponse = await api.get("/me/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      localStorage.setItem(
        "role",
        meResponse.data.role
      );

      localStorage.setItem(
        "username",
        meResponse.data.username
      );

      localStorage.setItem(
        "userId",
        meResponse.data.id
      );



      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
      console.log(error)
    }
  };

  return (
    <div
      className="login-container d-flex justify-content-center align-items-center"
    >
      <div className="login-card card shadow p-4">
        <h2 className="text-center mb-4">
          Consultorio SaaS
        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">
              Usuario
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ingrese usuario"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Ingrese contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Ingresar
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;