import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import Loading from "../Loading";

type Props = {};

//API
// https://dummyjson.com/products

const Products = (props: Props) => {
  const { products, loading } = useAppSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            border: "1px solid black",
            width: "100%",
            marginLeft: "180px",
            marginTop: "100px",
          }}
        >
          {products &&
            products.map((itam, index) => (
              <h3 key={index}>{itam.description}</h3>
            ))}
        </div>
      )}
    </>
  );
};
export default Products;
