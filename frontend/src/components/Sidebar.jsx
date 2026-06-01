import { Link } from "react-router-dom";

function Sidebar() {
  const logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        Consultorio SaaS
      </h3>

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className="nav-link text-white"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/patients"
            className="nav-link text-white"
          >
            Pacientes
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/doctors"
            className="nav-link text-white"
          >
            Médicos
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            to="/appointments"
            className="nav-link text-white"
          >
            Turnos
          </Link>
        </li>

      </ul>

      <hr />

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;