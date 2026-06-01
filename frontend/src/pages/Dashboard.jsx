import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const patients = await api.get("/patients/");
        const doctors = await api.get("/doctors/");
        const appointments = await api.get("/appointments/");

        const pending = appointments.data.filter(
          (a) => a.status === "pending"
        ).length;

        const confirmed = appointments.data.filter(
          (a) => a.status === "confirmed"
        ).length;

        const cancelled = appointments.data.filter(
          (a) => a.status === "cancelled"
        ).length;

        setStats({
          patients: patients.data.length,
          doctors: doctors.data.length,
          appointments: appointments.data.length,
          pending,
          confirmed,
          cancelled,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4">
        <h1 className="mb-4">Dashboard</h1>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Pacientes</h5>
                <h1>{stats.patients}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Médicos</h5>
                <h1>{stats.doctors}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5>Turnos</h5>
                <h1>{stats.appointments}</h1>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-4">

          <div className="col-md-4 mb-3">
            <div className="card border-warning">
              <div className="card-body text-center">
                <h5>Pendientes</h5>
                <h1>{stats.pending}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-success">
              <div className="card-body text-center">
                <h5>Confirmados</h5>
                <h1>{stats.confirmed}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-danger">
              <div className="card-body text-center">
                <h5>Cancelados</h5>
                <h1>{stats.cancelled}</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;