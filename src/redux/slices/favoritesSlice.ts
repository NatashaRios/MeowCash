import { ICrypto } from '@/interfaces/crypto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: ICrypto[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ICrypto>) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.id.toString() !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
