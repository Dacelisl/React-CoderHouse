import { ButtonIcon } from "./ButtonIcon";

export const Detail = ({ product }) => {
  return (
    <div className="flex w-11/12">
      <div className="absolute left-1/4 top-1/3 inline m-4">
        <div className="flex w-fit h-fit  float-left">
          <img className="object-cover w-full h-fit" src={product.thumbnail} />
        </div>
        <div className="inline-grid absolute ml-10 p-5 pt-0 pb-8 w-7/12  h-fit text-left float-righ">
          <span className="mt-1 mb-2 font-semibold text-2xl p-2 ">
            {product.title}
          </span>
          <span className="inline-block p-1 font-semibold">
            {product.description}
          </span>
          <span className="block font-light text-4xl mt-10 text-rose-700">
            ${product.price}
          </span>
          <div className="flex mt-10 mb-1  ml-9 h-8 items-center justify-center">
            <ButtonIcon
              title={"mas detalles"}
              nameIcon={"cart-outline"}
              sizeIcon={"large"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
