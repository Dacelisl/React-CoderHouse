import { useEffect, useState, useContext, lazy } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { getCategories, logOutGoogle } from "../../firebase/firebase";
import { customContext } from "../context/CustomContext";
import logo1 from "../../assets/logo1.png";
import "./header.css";
const CartWidget = lazy(() => import("./CartWidget"));
const CategoryList = lazy(() => import("./CategoryList"));
const ButtonIcon = lazy(() => import("../utils/ButtonIcon"));

export const NavBar = () => {
  const { setUser, reset, userLocal, setUserLocal } = useContext(customContext);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
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
    hamburgerButton();
    navigate("/");
  };
  const buttonHamburger = (name) => {
    return (
      <>
        <ButtonIcon
          className={
            "bg-none border-none cursor-pointer text-2xl p-1 lg:hidden"
          }
          nameIcon={name}
          sizeIcon={"large"}
          onClick={hamburgerButton}
        />
      </>
    );
  };
  const hamburgerButton = () => {
    setToggle(!toggle);
    document.querySelector(".navbar").classList.toggle("active");
    document.body.classList.toggle("active");
  };
  return (
    <header className="fixed top-0 left-0 w-full p-1 bg-neutral-500 z-10">
      <div className="container flex justify-between items-center m-auto px-3 md:px-2">
        <NavLink to={"/"}>
          <img src={logo1} alt="Film logo" className="w-32 pl-2 xl:pr-2 xl:w-36" />
        </NavLink>
        {buttonHamburger("reorder-three-outline")}
        <nav className="navbar lg:contents xl:contents ">
          <div className="flex justify-between items-center pt-5 pr-1 pb-7 pl-2">{buttonHamburger("close-outline")}</div>
          <CategoryList categories={categories} onClick={hamburgerButton} />
          <NavLink to={userLocal !== "" ? "/" : "/Login"}>
            <ButtonIcon
              className="flex items-center rounded-xl bg-slate-200 text-sm uppercase tracking-tight w-fit m-auto ml-6 mt-5 pr-2 pl-0  hover:focus:transition-opacity sm:mt-10 lg:mt-2 lg:mb-3 xl:ml-10"
              nameIcon={userLocal !== "" ? "log-in-outline" : "person"}
              sizeIcon={"large"}
              title={userLocal !== "" ? userLocal : "Sing In"}
              onClick={logOut}
            />
          </NavLink>
          <Link to={"/cart"} onClick={hamburgerButton}>
            <CartWidget />
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
