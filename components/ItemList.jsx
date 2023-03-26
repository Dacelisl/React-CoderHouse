import { Item } from "./Item";

export const ItemList = ({ products }) => {
  return (
    <div className="grid sm: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};
