import { createAsyncThunk } from '@reduxjs/toolkit';
import { Character } from '../../model/characters';
import { ApiRepo } from '../../services/api.repo';

export const loadCharactersThunk = createAsyncThunk<Character[], ApiRepo>(
  'characters/load',
  async (repo) => {
    const responseCharacters = await repo.getCharacters();
    return responseCharacters;
  }
);
