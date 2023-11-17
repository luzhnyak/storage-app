import { configureStore } from "@reduxjs/toolkit";
import { categorySliceReducer } from "./categories/slice";
import { productSliceReducer } from "./products/slice";
import { brandSliceReducer } from "./brands/slice";

export const store = configureStore({
  reducer: {
    categories: categorySliceReducer,
    products: productSliceReducer,
    brands: brandSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
