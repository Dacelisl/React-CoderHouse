import React from "react";
import { Link } from "react-router-dom";

export const CartDetail = ({ product, removeProduct }) => {
  return (
    <div className="table-row">
      <div className="table-cell text-center text-2xl align-middle ml-6">
        <button onClick={() => removeProduct(product.id)}>
          <ion-icon name="remove-circle-outline" size="large" />
        </button>
      </div>
      <div className="table-cell text-left pl-6">
        <div className="inline-flex w-2/3 h-28 ">
          <div className="flex relative bg-cover h-52 w-36 mt-3">
            <img
              className="w-8/12 h-1/2 scale-95"
              alt="Product description"
              src={product.thumbnail}
            />
          </div>
          <div className="flex font-semibold m-auto" id="description">
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </div>
        </div>
      </div>
      <div className="table-cell align-middle text-center">
        <span className="inline-block font-semibold">{product.units}</span>
      </div>
      <div className="table-cell align-middle text-center">
        <span className="inline-block font-semibold">$ {product.price}</span>
      </div>
      <div className="table-cell align-middle text-center pr-2">
        <span className="inline-block font-extralight text-2xl text-rose-600">
          $ {product.price * product.units}
        </span>
      </div>
    </div>
  );
};
