import { useEffect, useState, useContext, lazy } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCategories, logOutGoogle } from "../../firebase/firebase";
import  {customContext}  from "../context/CustomContext";
import logo1 from "../../assets/logo1.png";
import "./header.css";
const CartWidget = lazy( ()=> import ("./CartWidget"));
const CategoryList = lazy( ()=> import ("./CategoryList"));
const ButtonIcon = lazy( ()=> import ("../utils/ButtonIcon"));

export const NavBar = () => {
  const { setUser, reset, userLocal, setUserLocal } = useContext(customContext);
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
          <NavLink to={userLocal !== "" ? "/" : "/Login"}>
            <ButtonIcon
              className="session ml-1  lg:mr-12"
              nameIcon={userLocal !== "" ? "log-in-outline" : "person"}
              sizeIcon={"large"}
              title={userLocal !== "" ? userLocal : "Sing In"}
              onClick={logOut}
            />
          </NavLink>
          <Link to={"/cart"}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default NavBar
