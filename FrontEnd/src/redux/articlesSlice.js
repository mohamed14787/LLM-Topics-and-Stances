import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

// Async thunk to fetch articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await fetch("/clusters.json");
    const data = await response.json();
    // Assuming data is a dictionary of arrays, flatten if needed:
    const mergedArticles = Object.values(data).flat();
    console.log(data);
    return data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adapt for dictionary of arrays: flatten the arrays into one array
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
