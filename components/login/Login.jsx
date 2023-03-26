import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../utils/ButtonIcon";
import { Toast } from "../utils/Toast";
import matrix from "../../assets/matrix.jpg";
import {
  addUser,
  exist,
  registerWithGoogle
} from "../../firebase/firebase";
import { customContext } from "../context/CustomContext";
export const Login = () => {
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
    mail: res.email
  })
    localStorage.setItem("user_local", res.displayName);
    navigate('/')
  };

  const registerUser = async () => {
    if (user.mail && user.password && user.userName !== "") {
      const add = await addUser(user);
      setUserLocal(user.userName);
      localStorage.setItem("user_local", user.userName);
      setToast({
        state: true,
        message: add,
        type: add.includes("Successfully") ? "success" : "alert",
      });
      resetToast(add.includes("Successfully"), false);
      navigate("/");
    }
  };

  const login = async () => {
    console.log('ingreso al login ');
    const userDb = await exist("mail", user.mail);
    let res = "";
    if (userDb.length > 0) {
      if (userDb[0].password === user.password) {
        localStorage.setItem("user_local", userDb[0].userName);
        setUser(userDb[0]);
        setUserLocal(userDb[0].userName);
        res = `welcome Back ${userDb[0].userName}`;
      } else {
        res = "wrong password";
      }
    } else {
      res = "Email address is not recognized";
    }

    setToast({
      state: true,
      message: res,
      type: res.includes("welcome") ? "success" : "alert",
    });
    resetToast(res.includes("welcome"), true);
  };

  const resetToast = (res, log) => {
    setTimeout(() => {
      setToast(false);
      res && log ? (
        navigate("/")
      ) : res && log === false ? (
        setRegister(true)
      ) : (
        <></>
      );
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
      {register ? (
        <div className="md:w-1/2 lg:w-[40%] absolute h-auto w-10/12 bg-slate-500/20 top-1/2 left-1/2 rounded-xl backdrop-blur-md -translate-x-1/2 -translate-y-1/2 border-spacing-1 shadow-lg shadow-slate-400 py-6 px-7 text-slate-50">
          <h3 className="text-3xl text-center font-medium">Sing In</h3>
          <label className="block mt-8 text-base font-medium">Email: </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            onChange={(e) => setUser({ ...user, mail: e.target.value })}
            placeholder="Enter your email"
            className="block h-14 w-full bg-slate-700 rounded px-3 mt-2 text-lg font-extralight placeholder:text-slate-400 "
          />
          <label className="block mt-8 text-base font-medium">Password: </label>
          <input
            id="password"
            required
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="block h-14 w-full bg-slate-700 rounded px-3 mt-2 text-lg font-extralight placeholder:text-slate-400 "
          />
          <span className=" flex mt-8 mb-5  justify-center">
            <ButtonIcon
              title={"Sing In"}
              nameIcon={"log-in-outline"}
              sizeIcon={"large"}
              style={{
                width: "200px",
                backgroundColor: "#85b30b61",
                justifyContent: "center",
              }}
              onClick={login}
            />
          </span>
          <span className="block text-center text-md font-extralight mt-3">
            You don't have an account?
            <span
              className="cursor-pointer"
              onClick={() => setRegister(!register)}
            >
              Register Now!!
            </span>
          </span>
          <span className="block cursor-pointer text-center text-md font-extralight mt-10">
            <span className="flex align-middle justify-center border-solid border-2 w-auto m-auto p-2">
              <ion-icon name="logo-google" size="large"></ion-icon>
              <span className="ml-3 my-1" onClick={registerGoogle}>
                {" "}
                Register using Google
              </span>
            </span>
          </span>
        </div>
      ) : (
        <>
          <div
            id="register"
            className="md:w-1/2 lg:w-[40%] absolute h-auto w-10/12 bg-slate-500/20 top-[46%] left-1/2 rounded-xl backdrop-blur-md -translate-x-1/2 -translate-y-1/2 border-spacing-1 shadow-lg shadow-slate-400 py-6 px-7 mb-10 text-slate-50 overflow-auto"
          >
            <h3 className="text-3xl text-center font-medium">Register</h3>
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
            <label className="block mt-8 text-base font-medium">Email: </label>
            <input
              type="email"
              required
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
              placeholder="Enter your email"
              className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
            />
            <label className="block mt-8 text-base font-medium">
              Password:
            </label>
            <input
              required
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-lg font-extralight placeholder:text-slate-400 "
            />
            <span className=" flex mt-8 mb-5  justify-center">
              <ButtonIcon
                title={"Create Account"}
                nameIcon={"lock-open-outline"}
                sizeIcon={"large"}
                style={{
                  width: "200px",
                  backgroundColor: "#85b30b61",
                  justifyContent: "center",
                }}
                onClick={registerUser}
              />
            </span>
            <span className="block text-center text-md font-extralight mt-3">
              Already have an account?
              <span
                className="cursor-pointer"
                onClick={() => setRegister(!register)}
              >
                Sing In Now!!
              </span>
            </span>
            <span className="block cursor-pointer text-center text-md font-extralight mt-8">
              <span className="flex align-middle justify-center border-solid border-2 w-auto m-auto p-2">
                <ion-icon name="logo-google" size="large"></ion-icon>
                <span className="ml-3 my-1" onClick={registerGoogle}>
                  {" "}
                  Register using Google
                </span>
              </span>
            </span>
          </div>
        </>
      )}
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
