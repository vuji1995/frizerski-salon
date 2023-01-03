import Banner1 from "../components/Banner1";
import Banner2 from "../components/Banner2";
import Banner3 from "../components/Banner3";
import Footer from "../components/Footer";
import Sponsors from "../components/Sponsors";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PostaniClan from "../components/PostaniClan";
import Workers from "../components/Workers";

const MainPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Banner1 />
      <Workers />
      <Banner2 />
      <Sponsors />
      <Banner3 />
      <PostaniClan />
      <Footer />
    </div>
  );
};

export default MainPage;
