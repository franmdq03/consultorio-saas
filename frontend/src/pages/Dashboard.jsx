import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { ClipLoader } from "react-spinners";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const pieData = {
    labels: [
      "Pendientes",
      "Confirmados",
      "Cancelados",
    ],
    datasets: [
      {
        data: [
          stats.pending,
          stats.confirmed,
          stats.cancelled,
        ],
        backgroundColor: [
          "#ffc107",
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

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

      <div className="dashboard-container container-fluid p-4 page-enter">
        <h1 className="mb-4">Dashboard</h1>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5>Pacientes</h5>
                <h1>{stats.patients}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5>Médicos</h5>
                <h1>{stats.doctors}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <h5>Turnos</h5>
                <h1>{stats.appointments}</h1>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-4">

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card border-warning">
              <div className="card-body text-center">
                <h5>Pendientes</h5>
                <h1>{stats.pending}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card border-success">
              <div className="card-body text-center">
                <h5>Confirmados</h5>
                <h1>{stats.confirmed}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card dashboard-card border-danger">
              <div className="card-body text-center">
                <h5>Cancelados</h5>
                <h1>{stats.cancelled}</h1>
              </div>
            </div>
          </div>

        </div>
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h3 className="mb-4">
              Estado de Turnos
            </h3>

            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              <Pie data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;