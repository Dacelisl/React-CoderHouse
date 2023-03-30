import { useState, useEffect, useContext, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../firebase/firebase";
import { customContext } from "./context/CustomContext";
const ButtonIcon = lazy(() => import("../components/utils/ButtonIcon"));

const BillingDetail = ({ order }) => {
  const { billing, reset } = useContext(customContext);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [orderBD, setOrderBD] = useState([]);
  const [payDate, setPayDate] = useState("");

  useEffect(() => {
    async function getOrderBD() {
      const res = await getOrder(order.id);
      setOrderBD(res[0]);
    }
    const datePay = () => {
      const today = new Date(date);
      today.setDate(today.getDate() + 20);
      setPayDate(today.toLocaleDateString("en-US"));
    };
    const getDate = () => {
      const today = new Date();
      setDate(today.toLocaleDateString("en-US"));
    };
    getOrderBD();
    getDate();
    datePay();
  }, [payDate, date, order.id]);

  const close = () => {
    reset();
    navigate("/");
  };

  return (
    <div
      id="billingDetail"
      className={
        billing
          ? " absolute h-full w-full top-[50%] left-1/2  backdrop-blur-md -translate-x-1/2 -translate-y-1/2  z-50 overflow-auto"
          : "hidden"
      }
    >
      <div className=" absolute h-auto w-[70%]  bg-slate-600 top-[50%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 border-spacing-1 shadow-lg shadow-slate-400 py-6 px-7 mb-10 text-slate-50 overflow-scroll">
        <h3 className="text-3xl text-center font-medium mb-3">
          Billing Details
        </h3>
        <span
          className="text-cyan-50 font-semibold text-2xl flex absolute right-[3%] top-[3%] cursor-pointer "
          onClick={close}
        >
          X
        </span>
        <div className="grid auto-rows-auto gap-17 h-auto ">
          <div className="grid">
            <span className="pb-2 text-xl font-extralight pl-2">
              Billing Information
            </span>

            <div className=" w-full grid grid-cols-2 gap-4 p-3  border border-slate-100 text-xl ">
              <div className="pl-2">
                <div className="flex">
                  <span className="pb-5">Invoice:</span>
                  <span className="data-table pl-6">{orderBD.id}</span>
                </div>
                <div className="flex">
                  <span className="pb-3">Nombre:</span>
                  <span className="data-table pl-4">{orderBD.name}</span>
                </div>
                <div className="flex">
                  <span className="pb-3">Email:</span>
                  <span className="pdata-table l-10">{orderBD.email}</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <span className="pb-5">Date:</span>
                  <span className="pdata-table l-12">{date}</span>
                </div>
                <div className="flex">
                  <span className="pb-3">Apellido:</span>
                  <span className="data-table pl-4">{orderBD.lastName}</span>
                </div>
                <div className="flex">
                  <span className="pb-3">Phone:</span>
                  <span className="data-table pl-8">{orderBD.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="gap-">
            <span className="pb-2 text-xl font-extralight pl-2">Details</span>

            <div className="  border-t border-slate-100">
              <table className="table-auto w-full">
                <thead className="table-header-group mt-4 uppercase">
                  <tr>
                    <th className="head-table">Tilte</th>
                    <th className="head-table">Brand</th>
                    <th className="head-table">Units</th>
                    <th className="head-table">Unit Price</th>
                    <th className="head-table">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order.map((item) => (
                    <tr key={item.id}>
                      <td className="w-1/5 detail-table">{item.title}</td>
                      <td className="w-1/5 detail-table">{item.brand}</td>
                      <td className="w-1/5 detail-table">{item.units}</td>
                      <td className="w-1/5 detail-table">{item.price}</td>
                      <td className="w-1/5 detail-table">
                        {item.units * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="w-1/4 detail-table">
                      {orderBD.units} Units
                    </td>
                    <td></td>
                    <td className="w-1/4 detail-table">$ {orderBD.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="gap-y-5">
            <div className=" grid grid-cols-2 w-full gap-10 px-5 pt-5 text-center align-text-bottom">
              <span className="text-left pl-10">DUE BY</span>
              <span className="text-right pr-10">TOTAL</span>
            </div>
            <hr className="bg-slate-800 h-fit" />
            <div className=" grid grid-cols-2 w-full gap-10 px-5 pt-4 text-4xl font-semibold text-center">
              <span className="text-left pl-4">{payDate}</span>
              <span className="text-right pr-4">$ {orderBD.total} </span>
            </div>
          </div>
        </div>
        <span className="flex mt-2 mb-2  justify-center text-xl">
          <ButtonIcon
            title={"Close"}
            nameIcon={"checkmark-done-outline"}
            sizeIcon={"large"}
            style={{
              width: "180px",
              backgroundColor: "#d32f2f",
              justifyContent: "space-around",
              paddingRight: "30px",
              paddingLeft: "unset",
              boxShadow: "2px 2px 9px 1px rgb(0 0 0 / 57%)",
            }}
            onClick={close}
          />
        </span>
      </div>
    </div>
  );
};
export default BillingDetail;
