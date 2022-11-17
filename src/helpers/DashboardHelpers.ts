import { IProducts } from "../Interfaces";
type IFilterObject = {
  start: number;
  end: number;
  status: string;
};
export const getfilterdData = (
  products: IProducts[],
  filter: IFilterObject
) => {
  return products.filter((itam) => {
    if (filter.status === "All") {
      return itam;
    } else {
      // const filterValue = parseInt(filter.start, 10);
      return itam.price >= filter.start && itam.price <= filter.end;
    }
  });
};

export const getCategories = (products: IProducts[]) => {
  return [...new Set(products.map((itam) => itam.category))];
};

export const getStockRemainingPerCategory = (
  products: IProducts[],
  categories: string[]
) => {
  let stocks: number[] = [];
  for (let i = 0; i < categories.length; i++) {
    stocks[i] = products.reduce((acc, curr) => {
      if (curr.category === categories[i]) return acc + curr.stock;
      else return acc;
    }, 0);
  }
  return stocks;
};

export const createFilterObject = (value: string) => {
  const range = value.split("-");
  return {
    start: parseInt(range[0], 10),
    end: range[1] === "" ? Number.MAX_SAFE_INTEGER : parseInt(range[1], 10),
    status: "filter",
  };
};
