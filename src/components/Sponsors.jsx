import KeuneLogo from "../assests/keuneLogosvg.svg";
import RezuelLogo from "../assests/REUZEL.png";
import TakaraLogo from "../assests/takara.png";
import WahlLogo from "../assests/wahl.png";
import PietraNeraLogo from "../assests/pietranera.png";

const Sponsors = () => {
  return (
    <div className="sponsorsDiv" id="sponsors-id">
      <div className="sponsorsContainer">
        <img src={KeuneLogo} alt="logo" className="sponsorsLogoImg" />
        <img src={TakaraLogo} alt="logo" className="sponsorsLogoImg" />
        <img src={PietraNeraLogo} alt="logo" className="sponsorsLogoImg" />
        <img src={RezuelLogo} alt="logo" className="sponsorsLogoImg" />
        <img src={WahlLogo} alt="logo" className="sponsorsLogoImg" />
      </div>
    </div>
  );
};

export default Sponsors;
