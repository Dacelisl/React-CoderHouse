import { ButtonIcon } from "./utils/ButtonIcon";
import { Link } from "react-router-dom";

export const Item = ({ product }) => {
  return (
    <div className="w-64 h-80 ml-4 mr-4 mt-4 mb-4 bg-blue-100">
      <div className="inline-block w-64 h-40 ">
        <img className="object-cover w-full h-full" src={product.thumbnail} />
      </div>
      <div className="pl-2 text-left">
        <span className="inline-block p-0 pb-0 h-16 font-semibold" id="description">
          {product.title}
        </span>
        <span
          className="block font-extralight text-2xl -mt-2 text-rose-600"
        >
          $ {product.price}
        </span>
        <div className="flex mt-3 mb-1  ml-9 h-8">
          <Link to={`/product/${product.id}`}>
            <ButtonIcon
              title={"mas detalles"}
              nameIcon={"cart-outline"}
              sizeIcon={"small"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
