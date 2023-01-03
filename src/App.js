import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Rezerviraj from "./pages/Rezerviraj";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/book-now" element={<Rezerviraj />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/costumer" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
