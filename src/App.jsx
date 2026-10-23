import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Mission from './components/Mission.jsx';
import Definition from './components/Definition.jsx';
import Importance from './components/Importance.jsx';
import Structure from './components/Structure.jsx';
import BureauCarrousel from './components/BureauCarrousel.jsx';
import Participer from './components/Participer.jsx';
import CharitySection from './components/CharitySection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="conteneur">
          <Mission />
          <Definition />
          <Importance />
          <Structure />
          <BureauCarrousel />
          <Participer />
          <CharitySection />
        </div>
      </main>
      <Footer />
    </>
  );
}
