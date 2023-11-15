import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ac from '../slice/characters.slice';
import { RootState } from '../store/characters.store';
import { ApiRepo } from '../../services/api.repo';
import { Character } from '../../model/characters';

export function useCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersState
  );
  const dispatch = useDispatch();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      const loadedCharacters = await repo.getCharacters();
      dispatch(ac.load(loadedCharacters));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

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
    characters,
    loadCharacters,
    updateCharacter,
  };
}
