import SalonImg from "../assests/salon.jpeg";
import Card from "./Card";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="heroMain">
      <div className="mainContainer">
        <div className="heroTekst">
          <p className="heroTekstTitle">Barbershop Ritual</p>
          <p className="regularTekst">Tradicionalna usluga na moderan nacin</p>
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
