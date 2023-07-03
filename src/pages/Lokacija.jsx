import Logo from "../assests/logo2023.png";
import { Link } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Footer from "../components/Footer";

const Lokacija = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const lokacija = {
    lat: "43.50642",
    long: "16.46641",
  };

  return (
    <div className="locationDiv">
      <header className="headerWidthMax">
        <div className="headerDivLokacija">
          <Link to="/" className="logoDiv">
            <img src={Logo} alt="logo" className="logoImg" />
          </Link>

          <div className="buttonsLokacija">
            {loggedIn ? (
              <>
                <Link to="/costumer">
                  <button className="buttonRezerviraj">Profil</button>
                </Link>
                <Link to="/book-now">
                  <button className="buttonRezerviraj buttonLeftMargin">
                    Rezerviraj odmah
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <button className="buttonRezerviraj">Prijavi se</button>
                </Link>
                <Link to="/book-now">
                  <button className="buttonRezerviraj buttonLeftMargin">
                    Rezerviraj odmah
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="locationContainer">
        <h1 className="locationTitle">Lokacija</h1>
        <div className="lokacijaAdresa">
          <label className="labelAdresa">Adresa:</label>
          <p className="ulicaLokacija">Ul. Ruđera Boškovića 16, 21000, Split</p>
        </div>
        <div className="lokacijaAdresa">
          <label className="labelAdresa">Kordinate:</label>
          <p className="ulicaLokacija">Lat: 43.50642, Long: 16.46641</p>
        </div>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[lokacija.lat, lokacija.long]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker position={[lokacija.lat, lokacija.long]}>
              <Popup>{"Ritual Barbershop, Ul. Ruđera Boškovića 16"}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lokacija;
