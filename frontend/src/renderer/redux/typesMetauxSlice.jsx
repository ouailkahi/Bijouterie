import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/typesMetaux'; // Adjust the URL as needed

// Async thunk for fetching all typesMetaux
export const fetchTypesMetaux = createAsyncThunk('typesMetaux/fetchAll', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Async thunk for fetching a single typesMetaux by id
export const fetchTypesMetauxById = createAsyncThunk('typesMetaux/fetchById', async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

// Async thunk for creating a new typesMetaux
export const createTypesMetaux = createAsyncThunk('typesMetaux/create', async (typesMetaux) => {
    const response = await axios.post(API_URL, typesMetaux);
    return response.data;
});

// Async thunk for updating an existing typesMetaux
export const updateTypesMetaux = createAsyncThunk('typesMetaux/update', async ({ id, typesMetaux }) => {
    const response = await axios.put(`${API_URL}/${id}`, typesMetaux);
    return response.data;
});

// Async thunk for deleting a typesMetaux
export const deleteTypesMetaux = createAsyncThunk('typesMetaux/delete', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Create the slice
const typesMetauxSlice = createSlice({
    name: 'typesMetaux',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypesMetaux.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTypesMetaux.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTypesMetaux.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTypesMetauxById.fulfilled, (state, action) => {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(createTypesMetaux.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTypesMetaux.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTypesMetaux.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default typesMetauxSlice.reducer;
