import { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { Link } from "react-router-dom";

export const Count = ({ onAdd, stock }) => {
  const [units, setUnits] = useState(0);
  const [buy, setBuy] = useState(false);

  const reset = () => {
    onAdd(units);
    setUnits(0);
    setBuy(true);
  };
  return (
    <div>
      {!buy ? (
        <>
          <div className="flex h-auto mt-3  w-fit border-solid border-2 border-gray-700 items-center">
            <button
              disabled={units === 0 ? true : false}
              className="flex m-6 text-center text-4xl text-slate-500 hover:text-slate-600 active:transform active:translate-y-px"
              onClick={() => setUnits(units - 1)}
            >
              <ion-icon name="remove-circle-outline" size="large" />
            </button>
            <div className="inline-flex items-center text-center text-lg font-light">
              Unidades: {units}
            </div>
            <button
              disabled={units >= stock ? true : false}
              className="flex m-6 text-center text-4xl text-slate-500 hover:text-slate-600 active:transform active:translate-y-px"
              onClick={() => setUnits(units + 1)}
            >
              <ion-icon name="add-circle-outline" size="large" />
            </button>
          </div>
          <div className="flex mt-10 mb-1  ml-2 h-8 items-center justify-center">
            <ButtonIcon
              title={"Agregar Al Carrito"}
              nameIcon={"cart-outline"}
              sizeIcon={"large"}
              disabled={units === 0 ? true : false}
              onClick={() => reset()}
            />
          </div>
        </>
      ) : (
        <>
          <Link to={"/cart"}>
            <div className="flex mt-10 mb-1  ml-2 h-8 items-center justify-center">
              <ButtonIcon
                title={"Ir al Carrito"}
                nameIcon={"cart-outline"}
                sizeIcon={"large"}
                color="#16a34a"
              />
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
