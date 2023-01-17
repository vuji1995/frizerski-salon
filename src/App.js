import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Rezerviraj from "./pages/Rezerviraj";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Rezervacije from "./pages/Rezervacije";
import Lokacija from "./pages/Lokacija";
import { ContextProvider } from "./Context/Context";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/book-now" element={<Rezerviraj />} />
            <Route path="/location" element={<Lokacija />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/costumer" element={<PrivateRoute />}>
              <Route path="/costumer" element={<Profile />} />
              <Route path="/costumer/reservations" element={<Rezervacije />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
      </ContextProvider>
    </div>
  );
}

export default App;
