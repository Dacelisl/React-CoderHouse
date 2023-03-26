import { useState, useEffect } from "react";
import { Detail } from "./Detail";
import { useParams } from "react-router-dom";
import { NotFound } from "./404/NotFound";
import { productById } from "../firebase/firebase";

export const ItemDetail = () => {
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
    <>
      {!error ? (
        <>
          <Detail product={product} />
        </>
      ) : (
        <>
          <NotFound message={product.message} />
        </>
      )}
    </>
  );
};
