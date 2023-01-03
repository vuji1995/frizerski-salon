import Logo from "../assests/ritualLogo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
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
        </ul>
        <div className="buttons">
          <Link to="/sign-in">
            <button className="buttonPrijava">Prijava</button>
          </Link>
          <Link to="/book-now">
            <button className="buttonRezerviraj">Rezerviraj odmah</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
