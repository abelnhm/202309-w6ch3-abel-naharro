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

export const updateCharacterThunk = createAsyncThunk<
  Character,
  {
    repo: ApiRepo;
    id: Character['id'];
    updatedCharacter: Partial<Character>;
  }
>('characters/update', async ({ repo, id, updatedCharacter }) => {
  const responseUpdateCharacter = await repo.setCharacter(id, updatedCharacter);
  return responseUpdateCharacter;
});
