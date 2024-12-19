import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

// Async thunk to fetch articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const response = await fetch("/data.json");
    console.log("here we go");
    const data = await response.json();
    return data; // Return the fetched articles
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No manual reducers here, as we're fetching data asynchronously
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload; // Set the fetched articles
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;
