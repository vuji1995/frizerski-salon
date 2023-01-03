import { Link } from "react-router-dom";
import Logo from "../assests/ritualLogo.jpg";
import ButtonMenuService from "../components/ButtonMenuService";
import ButtonMenuBarber from "../components/ButtonMenuBarber";
import Footer from "../components/Footer";
import { useState } from "react";

const Rezerviraj = () => {
  const [obaveznoPolje, setObaveznoPolje] = useState("Obavezno polje");
  const [obaveznoPolje2, setObaveznoPolje2] = useState("Obavezno polje");

  const removeObaveznoPolje = () => {
    setObaveznoPolje("");
  };

  const removeObaveznoPolje2 = () => {
    setObaveznoPolje2("");
  };

  return (
    <div className="bookNowDiv">
      <header className="headerWidthMax">
        <div className="headerDiv">
          <Link to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <div className="buttons">
            <Link to="/book-now">
              <button className="buttonRezerviraj">Rezerviraj odmah</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="naslovDiv">
        <h1 className="rezervirajNaslov">Napravi rezervaciju</h1>
      </div>

      <div className="bookContainer">
        <div className="chooseServiceDiv">
          <p className="underlined-text">Izaberi uslugu</p>
          <ButtonMenuService onRemoveText={removeObaveznoPolje} />
          <p className="smallText">{obaveznoPolje}</p>
        </div>
        <div className="chooseBarberDiv">
          <p className="underlined-text">Izaberi frizera</p>
          <ButtonMenuBarber onRemoveText={removeObaveznoPolje2} />
          <p className="smallText">{obaveznoPolje2}</p>
        </div>
        <div className="chooseDateAndTime grid-row-span">
          Izaberi datum i vrijeme
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Rezerviraj;
