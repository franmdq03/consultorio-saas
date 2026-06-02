import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyAppointments = async () => {
        try {
            setLoading(true);

            const response = await api.get("/appointments/my/");

            setAppointments(response.data);

        } catch (error) {
            console.error(error);
            toast.error("Error al cargar turnos");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMyAppointments();
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container-fluid p-4 page-enter">
                <h1>Mis Turnos</h1>

                {loading ? (
                    <div className="text-center mt-5">
                        <ClipLoader size={60} />
                    </div>
                ) : (
                    <table className="table table-striped table-hover mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Paciente</th>
                                <th>Médico</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.patient_name}</td>
                                    <td>{a.doctor_name}</td>
                                    <td>{a.date}</td>
                                    <td>{a.time}</td>
                                    <td>{a.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MyAppointments;