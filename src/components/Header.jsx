import Logo from "../assests/logo2023.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useContext } from "react";
import Context from "../Context/Context";
import { useEffect } from "react";

const Header = () => {
  const { modalOpened, setModalOpened } = useContext(Context);
  const navigate = useNavigate();
  const openModal = () => {
    setModalOpened((oldState) => !oldState);
  };

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

  const [muiIconStyle, setMuiIconStyle] = useState({
    display: "none",
  });

  function updateMuiIconClassName() {
    if (window.innerWidth < 850) {
      setMuiIconStyle({ display: "block", cursor: "pointer" });
    } else {
      setMuiIconStyle({ display: "none" });
    }
  }

  const goToLokacija = () => {
    navigate("/location");
  };

  useEffect(() => {
    updateMuiIconClassName();
    window.addEventListener("resize", updateMuiIconClassName);
    return () => window.removeEventListener("resize", updateMuiIconClassName);
  }, []);

  return (
    <header>
      <div className="headerDiv">
        <Link to="/" className="logoDiv">
          <img src={Logo} alt="logo" className="logoImg" />
        </Link>
        <ul className="headerUlItem">
          <li className="headerLiItem" onClick={scrollIntoCard}>
            O nama
          </li>
          <li className="headerLiItem" onClick={scrollIntoWorkers}>
            Naš tim
          </li>
          <li className="headerLiItem" onClick={scrollIntoPartners}>
            Partneri
          </li>
          <li className="headerLiItem" onClick={scrollIntoKorisnici}>
            Korisnici
          </li>
          <li className="headerLiItem" onClick={goToLokacija}>
            Lokacija
          </li>
        </ul>

        <MenuIcon
          className="hamburger-menu"
          style={muiIconStyle}
          onClick={openModal}
        />

        <div className="buttons">
          {loggedIn ? (
            <Link to="/costumer">
              <button className="buttonPrijava">Profil</button>
            </Link>
          ) : (
            <Link to="/sign-in">
              <button className="buttonPrijava">Prijava</button>
            </Link>
          )}
          <Link to="/book-now">
            <button className="buttonRezerviraj">Rezerviraj odmah</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
