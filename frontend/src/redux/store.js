import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer, // Add articles slice to the store
  },
});

export default store;
