import { ButtonIcon } from "./ButtonIcon";
import { Link } from "react-router-dom";

export const Item = ({ product }) => {
  return (
    <div className="w-56 h-72 ml-4 mr-4 mt-4 mb-4 bg-blue-100">
      <div className="inline-block w-56 h-28  ">
        <img className="object-cover w-full h-full" src={product.thumbnail} />
      </div>
      <div className="pl-2 text-left">
        <span className="inline-block p-1 h-16 font-semibold" id="description">
          {product.title}
        </span>
        <span
          className="block font-extralight text-2xl mt-1 text-rose-600"
        >
          $ {product.price}
        </span>
        <div className="flex mt-4 mb-1  ml-9 h-8">
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
