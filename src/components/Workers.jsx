import Women10 from "../assests/women10.jpg";
import Women11 from "../assests/women11.jpg";
import Women12 from "../assests/women12.jpg";
import Women13 from "../assests/women13.jpg";
import Women14 from "../assests/women14.jpg";
import Barber5 from "../assests/barber5.jpeg";
import Barber4 from "../assests/barber4.jpg";
import Barber7 from "../assests/barber7.jpg";

const Workers = () => {
  return (
    <div className="workersDiv" id="workers-id">
      <div className="workersContainer">
        <div className="workerDiv">
          <img src={Barber4} alt="workersImage" className="workersImg" />
          <p className="workersName">Ante</p>
          <p className="workersBio">
            Čovjek s bradom. Umjetnik sa škarama. Ljubimac dobrog craft piva,
            također.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Barber5} alt="workersImage" className="workersImg" />
          <p className="workersName">Nedjeljko</p>
          <p className="workersBio">
            Danju barber - noću glazbenik. Jednako dobar sa britvom i sa tipkama
            harmonike.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women11} alt="workersImage" className="workersImg" />
          <p className="workersName">Anamarija</p>
          <p className="workersBio">
            Dio prvi duše salona. Osmijeh u ogledalu. Barberica do srži.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women10} alt="workersImage" className="workersImg" />
          <p className="workersName">Antonia</p>
          <p className="workersBio">
            Dio drugi bez duše, ali je zato alt po glasu i zvir po stasu.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women14} alt="workersImage" className="workersImg" />
          <p className="workersName">Marina</p>
          <p className="workersBio">
            Ako se po jutru dan poznaje, zbog naše Marine u Rituala je uvijek
            nasmiješeno i vedro.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Barber7} alt="workersImage" className="workersImg" />
          <p className="workersName">Grgo</p>
          <p className="workersBio">
            Hladno pivo i Pušenje u jednome. Čovik, drug i starješina. Naš Grec.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women12} alt="workersImage" className="workersImg" />
          <p className="workersName">Ana</p>
          <p className="workersBio">
            Ako ćemo pivat i plesat, evo je. Ako ćemo šišat i brijat, tu je. Zna
            sve o vinu i dobrom selfiju!
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women13} alt="workersImage" className="workersImg" />
          <p className="workersName">Tonija</p>
          <p className="workersBio">
            Naša mezimica…ako želiš top fade pogodit će te preciznije od Željka
            Mavrovića!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workers;
