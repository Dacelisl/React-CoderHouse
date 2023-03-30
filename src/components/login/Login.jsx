import { useState, useContext, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, exist, registerWithGoogle } from "../../firebase/firebase";
import { customContext } from "../context/CustomContext";
import matrix from "../../assets/matrix.jpg";
const ButtonIcon = lazy(() => import("../utils/ButtonIcon"));
const Toast = lazy(() => import("../utils/Toast"));

const Login = () => {
  const { user, setUser, setUserLocal } = useContext(customContext);
  const navigate = useNavigate();
  const [register, setRegister] = useState(true);
  const [toast, setToast] = useState({
    state: false,
    message: "",
    type: "alert",
  });

  const registerGoogle = async () => {
    const res = await registerWithGoogle();
    setUserLocal(res.displayName);
    setUser({
      userName: res.displayName,
      mail: res.email,
    });
    localStorage.setItem("user_local", res.displayName);
    navigate("/");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    let res = "";
    if (user.mail && user.password && user.userName !== "") {
      const userNameDB = await exist("userName", user.userName);
      const userMailDB = await exist("mail", user.mail);
      if (userNameDB.length > 0) {
        res = "User Already Exists";
      } else if (userMailDB.length > 0) {
        res = "The Mail is Being Used by Another User";
      } else {
        const add = await addUser(user);
        setUserLocal(user.userName);
        localStorage.setItem("user_local", user.userName);
        res = add;
      }
      msgToast(res);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const userDb = await exist("mail", user.mail);
    let res = "";
    if (userDb.length > 0) {
      if (userDb[0].password === user.password) {
        res = `welcome Back ${userDb[0].userName}`;
        localStorage.setItem("user_local", userDb[0].userName);
        setUserLocal(userDb[0].userName);
        setUser(userDb[0]);
      } else {
        res = "wrong password";
      }
    } else {
      res = "Email address is not recognized";
    }
    msgToast(res);
  };

  const msgToast = (msg) => {
    setToast({
      state: true,
      message: msg,
      type:
        msg.includes("welcome") || msg.includes("Successfully")
          ? "success"
          : "alert",
    });
    resetToast(msg.includes("welcome") || msg.includes("Successfully"));
  };
  const resetToast = (res) => {
    setTimeout(() => {
      setToast(false);
      res ? navigate("/") : res === false ? setRegister(true) : <></>;
    }, 2000);
  };
  return (
    <div
      className="fixed w-full h-full top-0"
      style={{
        backgroundImage: `url(${matrix})`,
        display: "block",
      }}
    >
      <div className="relatives">
        <form
          id="login"
          className="absolute h-fit w-[85%] bg-slate-500/20 top-[50%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-lg shadow-slate-400 text-slate-50 p-5 pt-4 mb-[10%] md:w-[60%] lg:w-[50%] xl:w-[40%] xl:p-10 2xl:w-[30%] 2xl:p-10  lg:top-[55%] lg:p-8"
        >
          <h3 className="text-xl md:text-3xl text-center font-semibold">
            {register ? "Sing In" : "Register"}
          </h3>
          {register ? (
            <></>
          ) : (
            <>
              <label className="block mt-3 text-base font-medium">
                Username:
              </label>
              <input
                type="text"
                required
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                placeholder="Enter your Username"
                className="block h-10 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
              />
            </>
          )}
          <label className="block mt-3 text-base font-medium ">Email: </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            onChange={(e) => setUser({ ...user, mail: e.target.value })}
            placeholder="Enter your email"
            className="block h-10 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
          />
          <label className="block mt-5 text-base font-medium">Password: </label>
          <input
            id="password"
            required
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="block h-10 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
          />
          <span className=" flex mt-4 mb-4  justify-center">
            <ButtonIcon
              id="btn-login"
              title={register ? "Sing In" : "Create Account"}
              nameIcon={register ? "log-in-outline" : "lock-open-outline"}
              sizeIcon={"large"}
              style={{
                width: "130px",
                height: "45px",
                backgroundColor: "#85b30b61",
                justifyContent: "center",
                fontSize: "medium",
              }}
              onClick={register ? login : registerUser}
            />
          </span>
          <span className="block text-center text-xs font-extralight mt-3 md:text-lg">
            {register
              ? " You don't have an account?"
              : "Already have an account?"}
            <span
              className="cursor-pointer"
              onClick={() => setRegister(!register)}
            >
              {register ? " Register Now!!" : "Sing In Now!!"}
            </span>
          </span>
          <span className="block cursor-pointer text-center text-sm font-extralight mt-4 mb-1 md:text-lg">
            <span className="flex items-center justify-center border-solid border-2 w-auto m-auto p-1">
              <ion-icon name="logo-google" size="large"></ion-icon>
              <span
                className="ml-1 text-xs lg:text-lg lg:ml-4"
                onClick={registerGoogle}
              >
                Register using Google
              </span>
            </span>
          </span>
        </form>
      </div>
      {toast.state ? (
        <>
          <Toast message={toast.message} type={toast.type} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
