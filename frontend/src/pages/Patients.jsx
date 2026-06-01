import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients/");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
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

      alert("Paciente creado");

      setUser("");
      setDni("");
      setPhone("");
      setBirthDate("");

      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Error al crear paciente");
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "¿Eliminar este paciente?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/patients/${id}/`);

      alert("Paciente eliminado");

      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
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

      alert("Paciente actualizado");

      setEditingId(null);
      setUser("");
      setDni("");
      setPhone("");
      setBirthDate("");

      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchUsers();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Pacientes</h1>
        <div className="card p-4 mb-4">
          <h2>Nuevo Paciente</h2>

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

          <br />
          <br />

          <input
            type="text"
            className="form-control"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />
          <br />

          <input
            type="date"
            className="form-control"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <br />
          <br />

          {editingId ? (
            <button
              className="btn btn-success"
              onClick={updatePatient}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={createPatient}
            >
              Guardar
            </button>
          )}

          <hr />
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
            {patients.map((patient) => (
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
  );
}

export default Patients;