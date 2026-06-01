import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments/");
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients/");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/");
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setPatient("");
    setDoctor("");
    setDate("");
    setTime("");
    setStatus("pending");
    setNotes("");
    setEditingId(null);
  };

  const createAppointment = async () => {
    try {
      await api.post("/appointments/", {
        patient: Number(patient),
        doctor: Number(doctor),
        date,
        time,
        status,
        notes,
      });

      alert("Turno creado");

      clearForm();
      fetchAppointments();
    } catch (error) {
      console.error(error);
      alert("Error al crear turno");
    }
  };

  const editAppointment = (appointment) => {
    setEditingId(appointment.id);

    setPatient(appointment.patient);
    setDoctor(appointment.doctor);
    setDate(appointment.date);
    setTime(appointment.time);
    setStatus(appointment.status);
    setNotes(appointment.notes || "");
  };

  const updateAppointment = async () => {
    try {
      await api.put(`/appointments/${editingId}/`, {
        patient: Number(patient),
        doctor: Number(doctor),
        date,
        time,
        status,
        notes,
      });

      alert("Turno actualizado");

      clearForm();
      fetchAppointments();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "¿Eliminar este turno?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/appointments/${id}/`);

      alert("Turno eliminado");

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">

        <h1 className="mb-4">Turnos</h1>

        <div className="card p-4 mb-4 shadow-sm">

          <h3 className="mb-3">
            {editingId ? "Editar Turno" : "Nuevo Turno"}
          </h3>

          <div className="mb-3">
            <label className="form-label">
              Paciente
            </label>

            <select
              className="form-select"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            >
              <option value="">
                Seleccione paciente
              </option>

              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Médico
            </label>

            <select
              className="form-select"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">
                Seleccione médico
              </option>

              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Fecha
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Hora
            </label>

            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Estado
            </label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">
                Pendiente
              </option>

              <option value="confirmed">
                Confirmado
              </option>

              <option value="cancelled">
                Cancelado
              </option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Notas
            </label>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {editingId ? (
            <button
              className="btn btn-success"
              onClick={updateAppointment}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={createAppointment}
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
                <th>Paciente</th>
                <th>Médico</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.notes}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        editAppointment(appointment)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteAppointment(appointment.id)
                      }
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

export default Appointments;