import { useContext } from "react";
import { customContext } from "./context/CustomContext";
import { Count } from "./Count";

export const Detail = ({ product }) => {
  const { addProduct } = useContext(customContext);

  const onAdd = (units) => {
    addProduct(product, units);
  };

  return (
    <div className="flex w-11/12 bg-slate-600">
      <div className="absolute left-1/4 top-1/3 inline m-4">
        <div className="flex w-fit h-fit  float-left">
          <img className="object-cover w-full h-fit" src={product.thumbnail} />
        </div>
        <div className="inline-grid absolute ml-10 mt-3 p-5 pt-0 pb-8 w-3/5  h-max text-left float-righ">
          <span className="mt-1 mb-3 font-semibold text-2xl p-2 ">
            {product.title}
          </span>
          <span className="inline-block p-1 font-semibold">
            {product.description}
          </span>
          <span className="pt-3 font-extralight text-lg">
            {product.stock} Stock
          </span>
          <span className="block font-light text-4xl mt-8 mb-3 text-rose-700">
            ${product.price}
          </span>
          <span className="mt-10">
            <Count stock={product.stock} onAdd={onAdd} />
          </span>
        </div>
      </div>
    </div>
  );
};
