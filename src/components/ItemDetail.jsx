import { useState, useEffect } from "react";
import { Detail } from "./Detail";
import { useParams } from "react-router-dom";
import { NotFound } from "./404/NotFound";

export const ItemDetail = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      setError(res.status === "404" ? true : false);
      const data = await res.json();

      setProduct(data);
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
