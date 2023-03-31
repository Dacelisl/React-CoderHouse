import { useContext, lazy } from "react";
import { customContext } from "./context/CustomContext";
const Count = lazy(() => import("./Count"));

const Detail = ({ product }) => {
  const { addProduct } = useContext(customContext);

  const onAdd = (units) => {
    addProduct(product, units);
  };

  return (
    <div className="container p-2">
      <div className="flex max-w-full md:relative xl:left-[20%] 2xl:left-[45%]" >
        <div className="mx-auto my-4 w-fit items-center justify-center md:grid-cols-2 md:absolute md:lef[20%] md:top-[35%] md:inline md:m-4">
          <div className="flex  md:float-left md:w[80%] lg:w-full lg:whitespace-nowrap">
            <img alt="product principal" src={product.thumbnail} />
            <span className="flex absolute left-[2%] z-[5]  bg-red-500 rounded-full w-20 h-20 text-2xl text-zinc-100 justify-center p-5 md:left-[10%]">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>
          <div className="mb-3 h-fit p-3 md:inline-grid md:absolute md:ml-5 md:mt-3 md:p-5 md:pt-0 md:pb-8 md:w-3/5 md:h-max md:text-left md:float-right lg:w-[90%]">
            <span className="mb-3 mt-1 flex justify-center text-xl font-bold text-slate-500 uppercase">
              {product.title}
            </span>
            <span className="flex p-3 text-justify text-lg font-normal lowercase">
              {product.description}
            </span>
            <span className="block pl-3 text-lg font-extralight text-zinc-400">
              {" "}
              Brand: {product.brand}
            </span>
            <span className="pl-3 text-lg font-extralight text-zinc-400">
              Available Stock: {product.stock}
            </span>
            <span className="mt-8 flex pl-2 text-4xl font-medium text-rose-700">
              ${product.price}
            </span>
            <span className="flex items-center justify-center mt-5">
              <Count stock={product.stock} onAdd={onAdd} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;