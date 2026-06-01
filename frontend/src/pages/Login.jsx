import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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

      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
      console.log(error)
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
      >
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