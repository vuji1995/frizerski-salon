import { Link } from "react-router-dom";
import Logo from "../assests/logo2023.png";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { getAuth } from "firebase/auth";

const Rezervacije = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [reservations, setReservations] = useState();

  const auth = getAuth();
  const email = auth.currentUser.email;

  const getAllReservations = async () => {
    const q = query(
      collection(db, "Reservations"),
      where("user_id", "==", email)
    );
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
      setReservations(data);
    });
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div className="bookNowDiv">
      <header className="headerWidthMax">
        <div className="headerDiv">
          <Link to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <div className="buttonsMojeRezervacije">
            {loggedIn ? (
              <>
                <Link to="/costumer">
                  <button className="buttonMojeRezervacije">Profil</button>
                </Link>
                <Link to="/book-now">
                  <button className="buttonMojeRezervacije buttonLeftMargin">
                    Rezerviraj odmah
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <button className="buttonMojeRezervacije">Prijavi se</button>
                </Link>
                <Link to="/book-now">
                  <button className="buttonMojeRezervacije buttonLeftMargin">
                    Rezerviraj odmah
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="rezervacijeContainer">
        <div className="mojeRezervacije">
          <h2 className="headingReserv">Moje rezervacije</h2>
        </div>
        {reservations === undefined ? (
          <p>Nema rezervacija</p>
        ) : (
          reservations.map((booking, indx) => {
            return (
              <div className="rezervacija" key={indx}>
                <div className="rezervacijaLeft">
                  <p>{booking.usluga}</p>
                  <div className="rezervDatVri">
                    <p>{booking.datum}</p>
                    <p>{booking.vrijeme}</p>
                  </div>
                </div>
                <button className="rezervButton">{booking.zaposlenik}</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Rezervacije;
