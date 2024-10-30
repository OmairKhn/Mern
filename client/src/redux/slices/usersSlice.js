// src/redux/slices/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, search }) => {
    const response = await axios.get(
      `http://localhost:3001/getAllUsers?page=${page}&pageSize=5&search=${search}`
    );
    return response.data;
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await axios.delete(`http://localhost:3001/deleteUser/${userId}`);
  return userId;
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }) => {
    await axios.put(`http://localhost:3001/updateUser/${id}`, data);
    return { id, ...data };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalPages: 0,
    currentPage: 1,
    searchQuery: "",
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedIndex = state.users.findIndex((user) => user._id === action.payload.id);
        if (updatedIndex !== -1) {
          state.users[updatedIndex] = action.payload;
        }
      });
  },
});

export const { setSearchQuery, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
