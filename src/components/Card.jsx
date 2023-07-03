import CardLogo from "../assests/logo2-2023.png";

const Card = () => {
  return (
    <div className="cardContainer" id="card-id">
      <img
        src={CardLogo}
        alt="logo"
        className="cardComponentImage imageHeight"
      />
      <p className="cardTekst">
        Fade Barbershop rezultat je vizije dvojca splitskih brijača koji su
        ciljem zadali udahnuti stari sjaj gradskih brijačnica u život modernog
        salona za šišanje, brijanje i njegu muškaraca. Fade Barbershop iskustvo
        je kombinacija suvremene tehnike brijanja i tradicionalne usluge zanata,
        s klasičnim elementima old-school brijačnice kroz ispunjavanje
        jedinstvenih potreba svakog pojedinačnog klijenta. <br />
        <br />
        Fade je tu za Vas. Biti prvi naime, oduvijek je bila naša misija. Ostati
        prvi naša je vizija, i put kojim smo si zadali kročiti kroz svaki radni
        dan i za svakog novog klijenta. Jer, Fade Barbershop je uvijek prvi.
      </p>
    </div>
  );
};

export default Card;
