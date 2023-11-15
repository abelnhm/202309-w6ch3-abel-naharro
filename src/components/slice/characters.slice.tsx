import { Character } from '../../model/characters';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadCharactersThunk, updateCharacterThunk } from './characters.thunks';

type CharactersState = {
  characters: Character[];
  charactersRequestState: 'idle' | 'loading' | 'error';
};

const initialState: CharactersState = {
  characters: [],
  charactersRequestState: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCharactersThunk.pending, (state: CharactersState) => {
      state.charactersRequestState = 'loading';
      return state;
    });
    builder.addCase(
      loadCharactersThunk.fulfilled,
      (state: CharactersState, { payload }: PayloadAction<Character[]>) => {
        state.characters = payload;
        state.charactersRequestState = 'idle';
        return state;
      }
    );
    builder.addCase(loadCharactersThunk.rejected, (state: CharactersState) => {
      state.charactersRequestState = 'error';
      return state;
    });
    builder.addCase(
      updateCharacterThunk.fulfilled,
      (state: CharactersState, { payload }: PayloadAction<Character>) => {
        state.characters[
          state.characters.findIndex((item) => item.id === payload.id)
        ] = payload;
        return state;
      }
    );
  },
});

export default charactersSlice.reducer;
