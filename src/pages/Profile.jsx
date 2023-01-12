import { Link, useNavigate } from "react-router-dom";
import Logo from "../assests/ritualLogo.jpg";
import { getAuth, deleteUser } from "firebase/auth";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";
import { db } from "../firebase.config";
import BootstrapModal from "../components/BootstrapModal";
import { faPray } from "@fortawesome/free-solid-svg-icons";
import { collection } from "firebase/firestore";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const LogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const currentUser = auth.currentUser;

  const getUserCollection = async () => {
    // Get user Collection
    let userData;
    const userCollection = await getDocs(collection(db, "users"));
    // Loop user collection
    userCollection.forEach((doc) => {
      // Check if current user is equal with user collection data
      if (currentUser.uid === doc.id) {
        // Store it in user data state
        //setUserData(doc.data());
        userData = doc.data();
        setFormData({
          name: userData.firstName,
          lastName: userData.lastName,
          email: currentUser.email,
          phoneNumber: userData.phoneNumber,
        });
      }
    });
  };

  useEffect(() => {
    getUserCollection();
  }, []);

  const deleteAccount = () => {
    const result = window.confirm(
      `Jeste li sigurni da želite izbrisati korisnički račun? `
    );

    if (result) {
      deleteUser(currentUser);
      navigate("/");
    }
  };

  const navigateReservations = () => {
    navigate("/costumer/reservations");
  };

  const date = new Date(auth.currentUser.metadata.creationTime);
  const formattedDate = date.toLocaleString("hr", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

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
              Promjeni info.
            </button>
          </div>
          <div className="labelDiv">
            <p className="profileLabel pTagMarginTop">Ime</p>
            <p>{formData.name}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel pTagMarginTop">Prezime</p>
            <p>{formData.lastName}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Email</p>
            <p>{formData.email}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Broj mobitela</p>
            <p>{formData.phoneNumber}</p>
          </div>
          <div className="labelDiv">
            <p className="profileLabel">Datum registracije</p>
            <p>{formattedDate}</p>
          </div>
        </div>
        <div className="buttonParent">
          <button className="buttonRezervacije" onClick={navigateReservations}>
            Moje rezervacije
          </button>
          <button className="logOutButton" onClick={LogOut}>
            <LogoutIcon></LogoutIcon>
            <p>Odjavi se</p>
          </button>
          <button className="deleteAccountButton" onClick={deleteAccount}>
            <p>Izbriši račun</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
