import { List } from './list';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Character } from '../../model/characters';
import { useCharacters } from '../hook/use.characters';
import { Provider } from 'react-redux';
import charactersReducer from '../slice/characters.slice';

jest.mock('../hook/use.characters');

describe('Given List component ', () => {
  describe('When we render it', () => {
    const store = configureStore({
      reducer: { charactersState: charactersReducer },
      preloadedState: {
        charactersState: {
          characters: [] as unknown as Character[],
          charactersRequestState: 'idle',
        },
      },
    });

    const loadCharacters = jest.fn();
    (useCharacters as jest.Mock).mockReturnValue({
      loadCharacters,
    });

    render(
      <Provider store={store}>
        <List></List>
      </Provider>
    );

    test('Then it should be in the document', () => {
      const listElement = screen.getAllByRole('list')[0];
      expect(listElement).toBeInTheDocument();
      expect(loadCharacters).toHaveBeenCalled();
    });
  });
});
