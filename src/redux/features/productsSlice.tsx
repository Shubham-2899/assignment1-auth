import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProducts } from "../../Interfaces";

export const getProducts = createAsyncThunk<IProducts[]>(
  "products/getProducts",
  async () => {
    const response = await fetch(
      `https://dummyjson.com/products?skip=5&limit=70`
    );
    const data = await response.json();
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
  deletedOwnProducts: number[];
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
  deletedOwnProducts: [],
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
    setDeletedProductIds: (state, action) => {
      state.deletedOwnProducts = action.payload;
    },
    resetDeletedProductIds: (state) => {
      state.deletedOwnProducts = [];
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
  setDeletedProductIds,
  resetDeletedProductIds,
} = productsSlice.actions;

export default productsSlice.reducer;
