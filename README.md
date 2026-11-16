# MediSlot – Frontend

The frontend of **MediSlot**, a Doctor Appointment and Healthcare Management System, developed using React.js.

## Overview

MediSlot is a web-based healthcare appointment platform that connects patients with doctors.

Patients can search for doctors, view available appointment slots, book appointments, make online payments, and manage their appointments.

Doctors can manage their profiles, appointment slots, and patient appointments. Administrators can manage users, doctors, and appointments through a dedicated dashboard.

This repository contains the React.js frontend application.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Redux Toolkit
- React Router DOM
- Axios
- Formik
- Yup
- Razorpay Checkout

## Features

### Patient

- User registration and login
- Email account activation
- Browse and search doctors
- View doctor profiles
- Check available appointment slots
- Book appointments
- Online payment using Razorpay
- View and manage appointments
- Cancel eligible appointments
- View appointment history
- Manage patient profile

### Doctor

- Doctor login
- Create and update doctor profile
- Upload profile image
- Create and manage appointment slots
- View appointments by date
- Manage appointment status
- View patient details

### Admin

- Admin dashboard
- Manage users
- Create and manage doctor accounts
- Manage doctor details
- View and manage appointments
- Activate and deactivate user accounts

## Installation

### 1. Clone the Repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

### 2. Navigate to the Frontend Folder

```bash
cd doctor_fe
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Backend API URL

Configure Axios to connect to your deployed backend or local backend server.

For example:

```javascript
axios.defaults.baseURL = "YOUR_BACKEND_API_URL";
```

Use the actual base URL configured in your project.

### 5. Run the Application

```bash
npm start
```

If your project uses Vite, use:

```bash
npm run dev
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Home |
| `/login` | Login |
| `/register` | Registration |
| `/findDoctors` | Find Doctors |
| `/profileDoctor/:id` | Doctor Details |
| `/patient/dashboard` | Patient Dashboard |
| `/doctor/dashboard` | Doctor Dashboard |
| `/doctor/profile` | Doctor Profile |
| `/admin/dashboard` | Admin Dashboard |
| `/myAppoinment` | My Appointments |
| `/doctorAppointments` | Doctor Appointments |
| `/ManageSlots` | Manage Slots |

## State Management

Redux Toolkit is used for managing authentication state and user information.

## API Communication

Axios is used to communicate with the backend REST APIs.

## Form Handling

Formik and Yup are used for form handling and validation.

## Responsive Design

The application uses CSS to provide a responsive interface for desktop, tablet, and mobile devices.

## Live Demo

[Visit MediSlot](https://appoinmentsystem.netlify.app/)

## Author

Developed as a learning project to gain practical experience in MERN stack development.

## License

This project is developed for educational and learning purposes.