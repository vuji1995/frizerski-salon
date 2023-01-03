import Women1 from "../assests/women1.jpg";
import Women3 from "../assests/women3.jpg";
import Women4 from "../assests/women4.jpg";
import Women5 from "../assests/women5.jpg";
import Women6 from "../assests/women6.jpg";
import Barber1 from "../assests/barber1.jpg";
import Barber2 from "../assests/barber2.jpg";
import Barber3 from "../assests/barber3.jpeg";

const Workers = () => {
  return (
    <div className="workersDiv" id="workers-id">
      <div className="workersContainer">
        <div className="workerDiv">
          <img src={Barber1} alt="workersImage" className="workersImg" />
          <p className="workersName">Ante</p>
          <p className="workersBio">
            Čovjek s bradom. Umjetnik sa škarama. Ljubimac dobrog craft piva,
            također.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Barber2} alt="workersImage" className="workersImg" />
          <p className="workersName">Nedjeljko</p>
          <p className="workersBio">
            Danju barber - noću glazbenik. Jednako dobar sa britvom i sa tipkama
            harmonike.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women3} alt="workersImage" className="workersImg" />
          <p className="workersName">Anamarija</p>
          <p className="workersBio">
            Dio prvi duše salona. Osmijeh u ogledalu. Barberica do srži.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women4} alt="workersImage" className="workersImg" />
          <p className="workersName">Antonia</p>
          <p className="workersBio">
            Dio drugi bez duše, ali je zato alt po glasu i zvir po stasu.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women5} alt="workersImage" className="workersImg" />
          <p className="workersName">Marina</p>
          <p className="workersBio">
            Ako se po jutru dan poznaje, zbog naše Marine u Rituala je uvijek
            nasmiješeno i vedro.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Barber3} alt="workersImage" className="workersImg" />
          <p className="workersName">Grgo</p>
          <p className="workersBio">
            Hladno pivo i Pušenje u jednome. Čovik, drug i starješina. Naš Grec.
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women6} alt="workersImage" className="workersImg" />
          <p className="workersName">Ana</p>
          <p className="workersBio">
            Ako ćemo pivat i plesat, evo je. Ako ćemo šišat i brijat, tu je. Zna
            sve o vinu i dobrom selfiju!
          </p>
        </div>
        <div className="workerDiv">
          <img src={Women1} alt="workersImage" className="workersImg" />
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
