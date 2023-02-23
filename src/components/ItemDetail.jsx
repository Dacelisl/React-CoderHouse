import { useState, useEffect } from "react";
import { Detail } from "./Detail";
import { useParams } from "react-router-dom";

export const ItemDetail = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);
  return (
    <>
      <Detail product={product} />
    </>
  );
};
