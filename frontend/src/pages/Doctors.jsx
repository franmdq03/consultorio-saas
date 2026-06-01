import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/");
      setDoctors(response.data);
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

  const createDoctor = async () => {
    try {
      await api.post("/doctors/", {
        user: Number(user),
        specialty,
        phone,
      });

      alert("Médico creado");

      setUser("");
      setSpecialty("");
      setPhone("");

      fetchDoctors();
    } catch (error) {
      console.error(error);
      alert("Error al crear médico");
    }
  };

  const editDoctor = (doctor) => {
    setEditingId(doctor.id);

    setUser(doctor.user);
    setSpecialty(doctor.specialty);
    setPhone(doctor.phone);
  };

  const updateDoctor = async () => {
    try {
      await api.put(`/doctors/${editingId}/`, {
        user: Number(user),
        specialty,
        phone,
      });

      alert("Médico actualizado");

      setEditingId(null);
      setUser("");
      setSpecialty("");
      setPhone("");

      fetchDoctors();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "¿Eliminar este médico?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/doctors/${id}/`);

      alert("Médico eliminado");

      fetchDoctors();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchUsers();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">

        <h1 className="mb-4">Médicos</h1>

        <div className="card p-4 mb-4 shadow-sm">

          <h3 className="mb-3">
            {editingId ? "Editar Médico" : "Nuevo Médico"}
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
              Especialidad
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Especialidad"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
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

          {editingId ? (
            <button
              className="btn btn-success"
              onClick={updateDoctor}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={createDoctor}
            >
              Guardar
            </button>
          )}

        </div>

        <div className="card p-3 shadow-sm">

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.username}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.phone}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editDoctor(doctor)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteDoctor(doctor.id)}
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

export default Doctors;