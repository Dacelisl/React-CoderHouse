import { useState, useContext, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, exist, registerWithGoogle } from "../../firebase/firebase";
import { customContext } from "../context/CustomContext";
import matrix from "../../assets/matrix.jpg";
const ButtonIcon = lazy(() => import("../utils/ButtonIcon"));
const Toast = lazy(() => import("../utils/Toast"));
const Spinner = lazy(() => import("../utils/spinner/Spinner"));

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
      className="fixed z-[3] pt-52 left-0 top-[9%] w-full h-full sm:top-20 overflow-auto"
      style={{
        backgroundImage: `url(${matrix})`,
        display: "block",
      }}
    >
      <form
        id="login"
        className="md:w-1/2 lg:w-[40%] absolute h-auto w-10/12 bg-slate-500/20 top-1/2 left-1/2 rounded-xl backdrop-blur-md -translate-x-1/2 -translate-y-1/2 border-spacing-1 shadow-lg shadow-slate-400 py-6 px-7 mb-10 text-slate-50 overflow-auto"
      >
        <h3 className="text-3xl text-center font-medium">
          {register ? "Sing In" : "Register"}
        </h3>
        {register ? (
          <></>
        ) : (
          <>
            <label className="block mt-5 text-base font-medium">
              Username:
            </label>
            <input
              type="text"
              required
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              placeholder="Enter your Username"
              className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
            />
          </>
        )}
        <label className="block mt-8 text-base font-medium">Email: </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          onChange={(e) => setUser({ ...user, mail: e.target.value })}
          placeholder="Enter your email"
          className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
        />
        <label className="block mt-8 text-base font-medium">Password: </label>
        <input
          id="password"
          required
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
        />
        <span className=" flex mt-8 mb-5  justify-center">
          <ButtonIcon
            id="btn-login"
            title={register ? "Sing In" : "Create Account"}
            nameIcon={register ? "log-in-outline" : "lock-open-outline"}
            sizeIcon={"large"}
            style={{
              width: "200px",
              backgroundColor: "#85b30b61",
              justifyContent: "center",
            }}
            onClick={register ? login : registerUser}
          />
        </span>
        <span className="block text-center text-md font-extralight mt-3">
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
        <span className="block cursor-pointer text-center text-md font-extralight mt-10">
          <span className="flex align-middle justify-center border-solid border-2 w-auto m-auto p-2">
            <ion-icon name="logo-google" size="large"></ion-icon>
            <span className="ml-3 my-1" onClick={registerGoogle}>
              Register using Google
            </span>
          </span>
        </span>
      </form>
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
