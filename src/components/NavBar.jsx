import { CartWidget } from "./CartWidget";
import { Categories } from "./Categories";
import { ButtonIonIcon } from "./ButtonIonIcon";
import logo1 from "../img/logo1.png";
import "./nav.css";

const NavBar = () => {
  const categories = [
    { id: 0, name: "Inicio" },
    { id: 1, name: "categoria 1" },
    { id: 2, name: "Contactenos" },
    { id: 3, name: "Nosotros" }
  ];
  function hamburgerButton() {
    document.querySelector(".navbar").classList.toggle("active");
    document.body.classList.toggle("active");
  }

  return (
    <header className="header">
      <div className="container">
        <a href="#" className="logo">
          <img src={logo1} alt="Film logo" />
        </a>
        <ButtonIonIcon
          className="menu-open-btn"
          nameIcon={"reorder-three-outline"}
          event={hamburgerButton}
        />
        <nav className="navbar">
          <div className="navbar-top">
            <a href="#" className="logo">
              <img src={logo1} alt="Film logo" />
            </a>
            <ButtonIonIcon
              className="menu-close-btn"
              nameIcon={"close-outline"}
              event={hamburgerButton}
            />
          </div>
          <Categories categories={categories} />
          <CartWidget />
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
