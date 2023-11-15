import { useEffect } from 'react';
import { Card } from '../card/card';
import { useCharacters } from '../hook/use.characters';
import { useSelector } from 'react-redux';
import { RootState } from '../store/characters.store';

export function List() {
  const { characters, charactersRequestState } = useSelector(
    (state: RootState) => state.charactersState
  );
  const { loadCharacters } = useCharacters();

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  if (charactersRequestState === 'loading') {
    return <p>Loading</p>;
  }

  if (charactersRequestState === 'error') {
    return <p>Error lading tasks</p>;
  }

  return (
    <>
      <ul className="characters-list row list-unstyled">
        {characters.map((item) => (
          <Card info={item} key={item.id}></Card>
        ))}
      </ul>
    </>
  );
}
