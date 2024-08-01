import { configureStore } from '@reduxjs/toolkit';
import typesMetauxReducer from './typesMetauxSlice'; // Adjust the path as needed
import commandeSlice from './commandeSlice';

const store = configureStore({
    reducer: {
        typesMetaux: typesMetauxReducer,
        commandes: commandeSlice
    },
});

export default store;
