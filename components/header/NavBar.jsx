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
  const { setUser, reset, userLocal, setUserLocal } = useContext(customContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function dataCategory() {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (error) {
        console.log("error en el category", error);
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
          <CategoryList categories={categories} onClick={hamburgerButton} />

          {userLocal !== "" ? (
            <>
              <Link to={"/"}>
                <ButtonIcon
                  className="session ml-1  lg:mr-12"
                  nameIcon={"log-in-outline"}
                  sizeIcon={"large"}
                  title={userLocal}
                  onClick={logOut}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to={"/Login"}>
                <ButtonIcon
                  className="session ml-1  lg:mr-12"
                  nameIcon={"person"}
                  sizeIcon={"large"}
                  title="Sing In"
                />
              </Link>
            </>
          )}

          <Link to={"/cart"}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
};
