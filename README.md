# 🏥 Sistema de Gestión de Turnos Médicos

Aplicación full stack desarrollada con **Django REST Framework + React**, orientada a la gestión de turnos médicos entre pacientes y médicos.

---

## 🚀 Tecnologías utilizadas

### Backend
- Python
- Django
- Django REST Framework
- SQLite / PostgreSQL

### Frontend
- React
- Axios
- React Router
- Bootstrap
- React Toastify

---

## 👥 Roles del sistema

### 🛡️ Administrador
- Tiene acceso total al sistema
- Puede crear, editar, eliminar y visualizar todos los turnos
- Gestión completa de pacientes y médicos

### 👤 Paciente
- Solo puede visualizar sus propios turnos

### 👨‍⚕️ Médico
- Solo puede visualizar los turnos asignados a él
---

## 📌 Funcionalidades

### 🔐 Autenticación
- Login de usuarios con control de acceso por roles (Django Groups)

### 🏥 Turnos médicos
- Registro de turnos (solo administrador)
- Asignación de paciente y médico
- Estados del turno:
  - Pendiente
  - Confirmado
  - Cancelado
- Notas médicas (solo administrador)

---

## 📅 Estructura de un turno

- Paciente
- Médico
- Fecha
- Hora
- Estado
- Notas

---

## 🔐 Seguridad y permisos

- 🔒 El **administrador tiene control total del sistema**
- 🔒 El **paciente solo puede ver sus propios turnos**
- 🔒 El **médico solo puede ver sus turnos asignados**
- 🔒 No existe creación de turnos por parte de pacientes o médicos

---

## ⚙️ Instalación

### 🔧 Backend
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

### 💻 Frontend
```bash
npm install
npm start
```

---

## 👨‍💻 Autor

Desarrollado por Francisco Garcia
