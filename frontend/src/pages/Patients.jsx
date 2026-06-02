import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await api.get("/patients/");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar pacientes");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPatient = async () => {
    try {
      await api.post("/patients/", {
        user: Number(user),
        dni,
        phone,
        birth_date: birthDate,
      });

      toast.success("Paciente creado correctamente");

      setUser("");
      setDni("");
      setPhone("");
      setBirthDate("");

      fetchPatients();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear paciente");
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "¿Eliminar este paciente?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/patients/${id}/`);

      toast.success("Paciente eliminado");

      fetchPatients();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar paciente");
    }
  };

  const editPatient = (patient) => {
    setEditingId(patient.id);

    setUser(patient.user);
    setDni(patient.dni);
    setPhone(patient.phone);
    setBirthDate(patient.birth_date);
  };

  const updatePatient = async () => {
    try {
      await api.put(`/patients/${editingId}/`, {
        user: Number(user),
        dni,
        phone,
        birth_date: birthDate,
      });

      toast.success("Paciente actualizado");

      setEditingId(null);
      setUser("");
      setDni("");
      setPhone("");
      setBirthDate("");

      fetchPatients();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar paciente");
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setUser("");
    setDni("");
    setPhone("");
    setBirthDate("");
  };

  useEffect(() => {
    fetchPatients();
    fetchUsers();
  }, []);


  const filteredPatients = patients.filter((patient) =>
    patient.username.toLowerCase().includes(search.toLowerCase()) ||
    patient.dni.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader size={60} />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4 page-enter">

        <h1 className="mb-4">Pacientes</h1>

        <div className="card p-4 mb-4 shadow-sm">

          <h3 className="mb-3">
            {editingId ? "Editar Paciente" : "Nuevo Paciente"}
          </h3>

          <div className="mb-3">
            <label className="form-label">
              Usuario
            </label>

            <select
              className="form-select"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="">
                Seleccione un usuario
              </option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              DNI
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Teléfono
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Fecha de nacimiento
            </label>

            <input
              type="date"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          {editingId ? (
            <div className="d-flex gap-2">

              <button
                className="btn btn-success"
                onClick={updatePatient}
              >
                Actualizar
              </button>

              <button
                className="btn btn-secondary"
                onClick={clearForm}
              >
                Cancelar
              </button>

            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={createPatient}
            >
              Guardar
            </button>
          )}

        </div>

        <div className="card p-3 shadow-sm">

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por usuario o DNI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Fecha Nacimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.username}</td>
                  <td>{patient.dni}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.birth_date}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editPatient(patient)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePatient(patient.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Patients;