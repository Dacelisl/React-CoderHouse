import { useState, useEffect, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../firebase/firebase";
const NotFound = lazy(() => import("./404/NotFound"));
const ItemList = lazy(() => import("./ItemList"));
const Spinner = lazy(() => import("./utils/spinner/Spinner"));

const ItemListContainer = () => {
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
            <Suspense
              fallback={
                <span className="flex absolute top-[40%] left-[50%]">
                  <Spinner />
                </span>
              }
            >
              <ItemList products={products} />
            </Suspense>
          ) : (
            <span className="flex absolute top-[40%] left-[50%]">
              <Spinner />
            </span>
          )}
        </>
      ) : (
        <Suspense
          fallback={
            <span className="flex absolute top-[50%] left-[50%]">
              <Spinner />
            </span>
          }
        >
          <NotFound message={products.message} />
        </Suspense>
      )}
    </>
  );
};
export default ItemListContainer;
