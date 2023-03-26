import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "./404/NotFound";
import { ItemList } from "./ItemList";
import { Spinner } from "./utils/spinner/Spinner";
import { getProducts } from "../firebase/firebase";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    getProducts(categoryId)
      .then((solve) => {
        setProducts(solve);
      })
      .catch((e) => {
        setError(true);
        <Link to={"/*"} />;
      });
  }, [categoryId]);

  return (
    <>
      {!error ? (
        <>
          {products.length > 0 ? (
            <>
              <ItemList products={products} />
            </>
          ) : (
            <span className="flex relative top-2/3 left-1/2 ">
              <Spinner />
            </span>
          )}
        </>
      ) : (
        <NotFound message={products.message} />
      )}
    </>
  );
};
