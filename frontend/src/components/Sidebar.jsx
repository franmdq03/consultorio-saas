import { Link } from "react-router-dom";
import "../styles/sidebar.css";

import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaSignOutAlt,
  FaClipboardList
} from "react-icons/fa";

function Sidebar() {
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    window.location.href = "/";
  };

  const role = localStorage.getItem("role");

  return (
    <div className="sidebar d-flex flex-column bg-dark text-white p-3">

      <h3 className="text-center mb-4">
        Consultorio SaaS
      </h3>

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className="nav-link text-white"
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        {(role === "Doctor" ||
          role === "Paciente") && (
          <li className="nav-item mb-2">
            <Link
              to="/my-appointments"
              className="nav-link text-white"
            >
              <FaClipboardList className="me-2" />
              Mis Turnos
            </Link>
          </li>
        )}

        {role === "Admin" && (
          <li className="nav-item mb-2">
            <Link
              to="/patients"
              className="nav-link text-white"
            >
              <FaUserInjured className="me-2" />
              Pacientes
            </Link>
          </li>
        )}

        {role === "Admin" && (
          <li className="nav-item mb-2">
            <Link
              to="/doctors"
              className="nav-link text-white"
            >
              <FaUserMd className="me-2" />
              Médicos
            </Link>
          </li>
        )}

        {role === "Admin" && (
          <li className="nav-item mb-2">
            <Link
              to="/appointments"
              className="nav-link text-white"
            >
              <FaCalendarAlt className="me-2" />
              Turnos
            </Link>
          </li>
        )}

      </ul>

      <hr />

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        <FaSignOutAlt className="me-2" />
        Cerrar sesión
      </button>

    </div>
  );
}

export default Sidebar;