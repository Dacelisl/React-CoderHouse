import { useState, useContext, useEffect, Suspense, lazy } from "react";
import { customContext } from "./context/CustomContext";
const ButtonIcon = lazy(() => import("../components/utils/ButtonIcon"));
const Spinner = lazy(() => import("../components/utils/spinner/Spinner"));
const BillingDetail = lazy(() => import("./BillingDetail"));

const Buy = () => {
  const { cart, detail, checkOut, setCheckOut, billing, setBilling } =
    useContext(customContext);
  const [userOrder, setUserOrder] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    order: [],
    units: "",
    total: "",
    id: "",
  });

  useEffect(() => {
    const getOrder = () => {
      const order = cart.map((item) => {
        return {
          id: item.id,
          title: item.title,
          brand: item.brand,
          price: item.price,
          units: item.units,
        };
      });
      setUserOrder({
        ...userOrder,
        order: order,
        units: detail.units,
        total: detail.price,
      });
    };
    getOrder();
  }, [cart, setUserOrder, detail]);

  const sendCheckOut = async () => {
    const { addOrder } = await import("../firebase/firebase");
    const send = await addOrder(userOrder);
    setUserOrder({
      ...userOrder,
      id: send.idOrder,
    });

    setBilling(true);
  };
  return (
    <>
      {billing ? (
        <Suspense
          fallback={
            <span className="flex absolute top-[40%] left-[50%]">
              <Spinner />
            </span>
          }
        >
          <BillingDetail order={userOrder} />
        </Suspense>
      ) : (
        <>
          <div
            className={
              checkOut
                ? " absolute h-full w-full top-[50%] left-1/2  backdrop-blur-sm -translate-x-1/2 -translate-y-1/2  z-50"
                : "hidden"
            }
          >
            <div className=" absolute h-auto w-10/12   bg-slate-600 top-[50%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 border-spacing-1 shadow-xl shadow-slate-400 py-6 px-7 mb-10 text-slate-50 overflow-auto">
              <h3 className="text-3xl text-center font-medium">
                Billing Details
              </h3>
              <span
                className="text-cyan-50 font-semibold text-2xl flex absolute right-[3%] top-[3%] cursor-pointer "
                onClick={() => setCheckOut(false)}
              >
                X
              </span>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label className="block mt-5 text-base font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) =>
                      setUserOrder({ ...userOrder, name: e.target.value })
                    }
                    placeholder="Enter your Name"
                    className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-xl font-extralight placeholder:text-slate-400 "
                  />
                  <label className="block mt-5 text-base font-medium">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) =>
                      setUserOrder({ ...userOrder, lastName: e.target.value })
                    }
                    placeholder="Enter your Last Name"
                    className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-xl font-extralight placeholder:text-slate-400 "
                  />
                </div>
                <div>
                  <label className="block mt-5 text-base font-medium">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    onChange={(e) =>
                      setUserOrder({ ...userOrder, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-xl font-extralight placeholder:text-slate-400 "
                  />
                  <label className="block mt-5 text-base font-medium">
                    Phone:
                  </label>
                  <input
                    required
                    type="number"
                    onChange={(e) =>
                      setUserOrder({ ...userOrder, phone: e.target.value })
                    }
                    placeholder="Enter your phone Number"
                    className="block h-14 w-full bg-slate-700 rounded px-3 mt-1 text-xl font-extralight placeholder:text-slate-400 "
                  />
                </div>
              </div>
              <span className=" flex mt-8 mb-5  justify-center font-semibold text-2xl">
                <Suspense fallback={<div>Loading...</div>}>
                  <ButtonIcon
                    title={"Send"}
                    nameIcon={"bag-check-outline"}
                    disabled={
                      userOrder.name !== "" &&
                      userOrder.lastName !== "" &&
                      userOrder.email !== "" &&
                      userOrder.phone !== ""
                        ? false
                        : true
                    }
                    sizeIcon={"large"}
                    style={{
                      width: "180px",
                      backgroundColor: "#749818db",
                      justifyContent: "space-around",
                      paddingRight: "30px",
                      paddingLeft: "unset",
                      boxShadow: "2px 2px 9px 1px rgb(0 0 0 / 57%)",
                    }}
                    onClick={sendCheckOut}
                  />
                </Suspense>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Buy;
