import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { productById } from "../firebase/firebase";
const Detail = lazy(() => import("./Detail"));
const NotFound = lazy(() => import("./404/NotFound"));
const Spinner = lazy(() => import("./utils/spinner/Spinner"));

const ItemDetail = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const data = await productById(id);
      data.length !== 0 ? setProduct(data[0]) : setError(true);
    };
    getProduct();
  }, [id]);
  return (
    <Suspense fallback={<span className="flex absolute top-[40%] left-[50%]"><Spinner /></span>}>
      {!error ? (
        <>
          <Detail product={product} />
        </>
      ) : (
        <>
          <NotFound message={product.message} />
        </>
      )}
    </Suspense>
  );
};
export default ItemDetail;
