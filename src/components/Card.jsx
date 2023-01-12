import CardLogo from "../assests/cardLogo.jpg.png";

const Card = () => {
  return (
    <div className="cardContainer" id="card-id">
      <img src={CardLogo} alt="logo" className="cardComponentImage" />
      <p className="cardTekst">
        Ritual Barbershop rezultat je vizije dvojca splitskih brijača koji su
        ciljem zadali udahnuti stari sjaj gradskih brijačnica u život modernog
        salona za šišanje, brijanje i njegu muškaraca. Ritual Barbershop
        iskustvo je kombinacija suvremene tehnike brijanja i tradicionalne
        usluge zanata, s klasičnim elementima old-school brijačnice kroz
        ispunjavanje jedinstvenih potreba svakog pojedinačnog klijenta. <br />
        <br />
        Ritual je tu za Vas. Biti prvi naime, oduvijek je bila naša misija.
        Ostati prvi naša je vizija, i put kojim smo si zadali kročiti kroz svaki
        radni dan i za svakog novog klijenta. Jer, Ritual Barbershop je uvijek
        prvi.
      </p>
    </div>
  );
};

export default Card;
