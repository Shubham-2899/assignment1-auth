import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProducts } from "../../Interfaces";

export const getProducts = createAsyncThunk<IProducts[]>(
  "products/getProducts",
  async () => {
    const response = await fetch(
      `https://dummyjson.com/products?skip=5&limit=70`
    );
    // console.log("🚀 ~ file: productsSlice.tsx ~ line 10 ~ response", response);

    const data = await response.json();
    // console.log("🚀 ~ file: productsSlice.tsx ~ line 13 ~ data", data.products);
    return data.products;
  }
);

type filterObject = {
  start: number;
  end: number;
  status: string;
};

type ProductsState = {
  products: IProducts[];
  loading: boolean;
  filter: filterObject;
  ownProductsAPIData: IProducts[];
  ownFilters: string[];
};

const initialFilter: filterObject = {
  start: 0,
  end: 0,
  status: "All",
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  filter: initialFilter,
  ownProductsAPIData: [],
  ownFilters: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setOwnProducts: (state, action) => {
      state.ownProductsAPIData = action.payload;
    },
    resetOwnProducts: (state) => {
      state.ownProductsAPIData = [];
    },
    setOwnFilters: (state, action) => {
      if (state.ownFilters.indexOf(action.payload) === -1)
        state.ownFilters = [...state.ownFilters, action.payload];
    },
    removeOwnFilter: (state, action) => {
      const filters = state.ownFilters;
      state.ownFilters = filters.filter((filter) => filter !== action.payload);
    },
    resetOwnFilters: (state) => {
      state.ownFilters = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const {
  setFilter,
  setOwnProducts,
  setOwnFilters,
  resetOwnFilters,
  resetOwnProducts,
  removeOwnFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
