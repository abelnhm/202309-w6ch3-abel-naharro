import { Character } from '../../model/characters';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CharactersState = {
  characters: Character[];
};

const initialState: CharactersState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    load: (state: CharactersState, { payload }: PayloadAction<Character[]>) => {
      state.characters = payload;
      return state;
    },
    update: (state: CharactersState, { payload }: PayloadAction<Character>) => {
      state.characters[
        state.characters.findIndex((item) => item.id === payload.id)
      ] = payload;
      return state;
    },
  },
});
export default charactersSlice.reducer;
export const { load, update } = charactersSlice.actions;
