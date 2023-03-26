import { useEffect, useState, useContext } from "react";
import { CartWidget } from "./CartWidget";
import { CategoryList } from "./CategoryList";
import { ButtonIcon } from "../utils/ButtonIcon";
import { getCategories, logOutGoogle } from "../../firebase/firebase";
import logo1 from "../../assets/logo1.png";
import "./header.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { customContext } from "../context/CustomContext";

export const NavBar = () => {
  console.log('user en nav', user);
  const { setUser, reset, userLocal ,setUserLocal } = useContext(customContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function dataCategory() {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        navigate("/NotFound");
      }
    }
    dataCategory();
  }, []);

  const logOut = () => {
    localStorage.removeItem("user_local");
    reset();
    setUserLocal("");
    setUser({
      userName: "",
      mail: "",
      password: "",
      id: "",
    });
    logOutGoogle();
    navigate("/");
  };
  const buttonHamburger = (clas, name) => {
    return (
      <>
        <ButtonIcon
          className={clas}
          nameIcon={name}
          sizeIcon={"large"}
          onClick={hamburgerButton}
        />
      </>
    );
  };
  const hamburgerButton = () => {
    document.querySelector(".navbar").classList.toggle("active");
    document.body.classList.toggle("active");
  };
  return (
    <header className="header">
      <div className="container">
        <NavLink to={"/"} className="logo">
          <img src={logo1} alt="Film logo" />
        </NavLink>
        {buttonHamburger("menu-open-btn", "reorder-three-outline")}
        <nav className="navbar">
          <div className="navbar-top">
            {buttonHamburger("menu-close-btn", "close-outline")}
          </div>
          <CategoryList categories={categories} onClick={hamburgerButton} />
          <Link to={userLocal !== "" ? "/" : "/Login"}>
            <ButtonIcon
              className="session ml-1  lg:mr-12"
              nameIcon={userLocal !== "" ? "log-in-outline" : "person"}
              sizeIcon={"large"}
              title={userLocal !== "" ? userLocal : "Sing In"}
              onClick={logOut}
            />
          </Link>
          <Link to={"/cart"}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
};
