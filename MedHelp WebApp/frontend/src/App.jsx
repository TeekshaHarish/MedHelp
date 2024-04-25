import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { ApplyDoctor } from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import DocProfile from "./pages/doctor/DocProfile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DocAppointments from "./pages/doctor/DocAppointments";
import Symptoms from "./pages/Symptoms";
import RecommendedDoctors from "./pages/RecommendedDoctors";
import Logout from "./pages/Logout";
import AllDoctors from "./pages/AllDoctors";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                // <PublicRoute>
                <Home />
                // {/* </PublicRoute> */}
              }
            />
            <Route
              path="/all-doctors"
              element={
                <ProtectedRoute>
                  <AllDoctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/symptoms"
              element={
                <ProtectedRoute>
                  <Symptoms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommended-doctors"
              element={
                <ProtectedRoute>
                  <RecommendedDoctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile"
              element={
                <ProtectedRoute>
                  <DocProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute>
                  <DocAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
