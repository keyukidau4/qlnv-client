import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import PrivateRoute from "./components/auth/PrivateRoute";
import HomePage from "./pages/home.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile.page";
import CameraComponent from "./components/feature/convertImageToText";
import UploadImageComponent from "./components/feature/uploadImage";
import AdminRoute from "./components/auth/AdminRoute";
import AdminDashboard from "./pages/admin";
import UsersDashboard from "./pages/admin/users";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload-file" element={<UploadImageComponent />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-dashboard/users"
          element={
            <AdminRoute>
              <UsersDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/process-image"
          element={
            <PrivateRoute>
              <CameraComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-image"
          element={
            <PrivateRoute>
              <UploadImageComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
