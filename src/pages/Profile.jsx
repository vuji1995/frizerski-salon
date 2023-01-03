import { Link, useNavigate } from "react-router-dom";
import Logo from "../assests/ritualLogo.jpg";
import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import BootstrapModal from "../components/BootstrapModal";
import { faPray } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const LogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const DeleteAccount = () => {};

  const changeProfileInfo = () => {};

  return (
    <div className="flexContainer" id="cont">
      <header className="fullWidthHeader">
        <div className="headerDiv">
          <Link to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <Link to="/book-now">
            <button className="buttonRezerviraj">Rezerviraj odmah</button>
          </Link>
        </div>
      </header>
      <BootstrapModal show={show} onClose={handleClose} />

      <div className="profileContainer">
        <div className="profileInfo">
          <div className="podaciRacuna">
            <p>Podaci o računu</p>
            <button className="izbrisiRacun" onClick={handleShow}>
              Promjeni informacije
            </button>
          </div>
          <div className="labelDiv">
            <p className="profileLabel pTagMarginTop">Ime</p>
            <p>{formData.name}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Email</p>
            <p>{formData.email}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Vrijeme zadnjeg logiranja</p>
            <p>{auth.currentUser.metadata.lastSignInTime}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Datum registracije</p>
            <p>{auth.currentUser.metadata.creationTime}</p>
          </div>
        </div>
        <button className="buttonRezervacije">Rezervacije</button>
        <button className="logOutButton" onClick={LogOut}>
          <LogoutIcon></LogoutIcon>
          <p>Odjavi se</p>
        </button>
        <button className="deleteAccountButton">
          <p>Izbriši račun</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
