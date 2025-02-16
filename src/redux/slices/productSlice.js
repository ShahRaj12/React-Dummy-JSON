import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

// Fetch Products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (page = 1) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    return {
      products: response.data.products,
      total: response.data.total,
      currentPage: page,
    };
  }
);

// Add Product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData) => {
    const response = await axios.post(API_URL + "/add", productData);
    return response.data;
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
