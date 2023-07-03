import SalonImg from "../assests/salon.jpeg";
import Card from "./Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Context from "../Context/Context";
import Logo from "../assests/ritualLogo.jpg";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useEffect } from "react";

const HeroSection = () => {
  const { modalOpened, setModalOpened } = useContext(Context);
  const scrollIntoCard = () => {
    const cardElement = document.getElementById(`card-id`);
    cardElement.scrollIntoView({ behavior: "smooth" });
  };

  const scrollIntoWorkers = () => {
    const workersElement = document.getElementById(`workers-id`);
    workersElement.scrollIntoView({ behavior: "smooth" });
  };

  const scrollIntoPartners = () => {
    const partnersElement = document.getElementById(`sponsors-id`);
    partnersElement.scrollIntoView({ behavior: "smooth" });
  };

  const scrollIntoKorisnici = () => {
    const korisniciElement = document.getElementById(`korisnici-id`);
    korisniciElement.scrollIntoView({ behavior: "smooth" });
  };

  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setModalOpened(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const goToLokacija = () => {
    navigate("/location");
  };

  return (
    <div className="heroMain">
      {modalOpened ? (
        <div className="hamburgerContainer">
          <ul className="headerUlItem-hamburger">
            <li className="headerLiItem-hamburger" onClick={scrollIntoCard}>
              O nama
            </li>
            <li className="headerLiItem-hamburger" onClick={scrollIntoWorkers}>
              Naš tim
            </li>
            <li className="headerLiItem-hamburger" onClick={scrollIntoPartners}>
              Partneri
            </li>
            <li
              className="headerLiItem-hamburger"
              onClick={scrollIntoKorisnici}
            >
              Korisnici
            </li>
            <li className="headerLiItem-hamburger" onClick={goToLokacija}>
              Lokacija
            </li>
          </ul>
          <div className="buttons-hamburger">
            {loggedIn ? (
              <Link to="/costumer">
                <button className="buttonPrijava-hamburger">Profil</button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <button className="buttonPrijava-hamburger">Prijava</button>
              </Link>
            )}
            <Link to="/book-now">
              <button className="buttonRezerviraj-hamburger">
                Rezerviraj odmah
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="mainContainer">
        <div className="heroTekst">
          <p className="heroTekstTitle">Barbershop Fade</p>
          <p className="regularTekst">Tradicionalna usluga na moderan način.</p>
          <Link to="/book-now">
            <button className="buttonRezerviraj xl">Rezerviraj odmah</button>
          </Link>
        </div>
        <img src={SalonImg} alt="salon" className="salonImage" />
        <Card></Card>
      </div>
    </div>
  );
};

export default HeroSection;
