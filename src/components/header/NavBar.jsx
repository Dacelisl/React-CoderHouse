import { CartWidget } from "./CartWidget";
import { CategoryList } from "./CategoryList";
import { ButtonIcon } from "../ButtonIcon";
import { categories } from "./categories";
import logo1 from "../../img/logo1.png";
import "./header.css";
import { NavLink, Link } from "react-router-dom";

export const NavBar = () => {
  
  function hamburgerButton() {
    document.querySelector(".navbar").classList.toggle("active");
    document.body.classList.toggle("active");
  }
  return (
    <header className="header">
      <div className="container">
        <NavLink to={"/"} className="logo">
          <img src={logo1} alt="Film logo" />
        </NavLink>
        <ButtonIcon
          className="menu-open-btn"
          nameIcon={"reorder-three-outline"}
          sizeIcon={"large"}
          onClick={hamburgerButton}
        />
        <nav className="navbar">
          <div className="navbar-top">
            <NavLink to={"/"} className="logo">
              <img src={logo1} alt="Film logo" />
            </NavLink>
            <ButtonIcon
              className="menu-close-btn"
              nameIcon={"close-outline"}
              onClick={hamburgerButton}
              sizeIcon={"large"}
            />
          </div>
          <CategoryList categories={categories} onClick={hamburgerButton}/>
          <Link to={"/cart"}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
};
