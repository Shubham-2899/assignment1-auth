import axios from "axios";
import { IProducts } from "../Interfaces";

export const fetchData = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const searchFromFilteredData = (
  filters: string[],
  data: IProducts[],
  query: string
) => {
  const keys = ["title", "category", "description"];
  return data.filter(
    (itam) =>
      filters.some((filter) => itam.category === filter) &&
      keys.some((key) =>
        itam[key as keyof typeof itam].toString().toLowerCase().includes(query)
      )
  );
};

export const deleteSelectedProducts = (
  products: IProducts[],
  selectedProductIds: number[]
) => {
  return products.filter(
    (product) => selectedProductIds.indexOf(product.id) === -1
  );
};
