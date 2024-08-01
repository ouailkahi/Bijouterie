// src/features/commandes/commandesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/commandes';

// Async thunks for API calls
export const fetchAllCommandes = createAsyncThunk(
  'commandes/fetchAll',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
);

export const fetchCommandesById = createAsyncThunk(
  'commandes/fetchById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
);

export const createCommandes = createAsyncThunk(
  'commandes/create',
  async (commandes) => {
    const response = await axios.post(API_URL, commandes);
    return response.data;
  },
);

export const updateCommandes = createAsyncThunk(
  'commandes/update',
  async ({ id, commandes }) => {
    const response = await axios.put(`${API_URL}/${id}`, commandes);
    return response.data;
  },
);

export const deleteCommandes = createAsyncThunk(
  'commandes/delete',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

export const fetchAllCommandesPagination = createAsyncThunk(
  'commandes/fetchAllCommandesPagination',
  async ({ page = 0, size = 10 }) => {
    const response = await axios.get(
      `${API_URL}/pagination?page=${page}&size=${size}`,
    );
    return response.data;
  },
);

const commandesSlice = createSlice({
  name: 'commandes',
  initialState: {
    commandesList: [],
    selectedCommandes: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommandes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCommandes.fulfilled, (state, action) => {
        state.status = 'succeeded-fetching';
        state.commandesList = action.payload;
      })
      .addCase(fetchAllCommandes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCommandesById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommandesById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCommandes = action.payload;
      })
      .addCase(fetchCommandesById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCommandes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommandes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commandesList = [, action.payload, ...state.commandesList];
      })
      .addCase(createCommandes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCommandes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCommandes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.commandesList.findIndex(
          (commandes) => commandes.id === action.payload.id,
        );
        state.commandesList[index] = action.payload;
      })
      .addCase(updateCommandes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCommandes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCommandes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commandesList = state.commandesList.filter(
          (commandes) => commandes.id !== action.payload,
        );
      })
      .addCase(deleteCommandes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllCommandesPagination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCommandesPagination.fulfilled, (state, action) => {
        state.status = 'succeeded-fetching';
        state.commandesList = action.payload;
      })
      .addCase(fetchAllCommandesPagination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      ;
  },
});

export default commandesSlice.reducer;
