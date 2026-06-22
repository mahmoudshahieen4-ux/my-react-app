import Navbar from "../components/nav";
import HeroSection from "../components/heroSection";
import FeaturesSection from "../components/featuresSection";
import CharactersSection from "../components/charactersSection";
import TrailerSection from "../components/trailerSection";
import NewsSection from "../components/newsSection";
import DownloadSection from "../components/downloadSection";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="relative w-full" style={{ backgroundColor: "#05020c" }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <TrailerSection />
      <NewsSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}