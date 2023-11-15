import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as ac from '../slice/characters.slice';
import { AppDispatch } from '../store/characters.store';
import { ApiRepo } from '../../services/api.repo';
import { Character } from '../../model/characters';
import { loadCharactersThunk } from '../slice/characters.thunks';

export function useCharacters() {
  const dispatch = useDispatch<AppDispatch>();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      dispatch(loadCharactersThunk(repo));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, repo]);

  const updateCharacter = async (
    id: Character['id'],
    character: Partial<Character>
  ) => {
    try {
      const updatedNote = await repo.setCharacter(id, character);
      dispatch(ac.update(updatedNote));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    loadCharacters,
    updateCharacter,
  };
}
