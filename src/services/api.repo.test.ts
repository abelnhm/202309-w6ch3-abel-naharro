import { Character } from '../model/characters';
import { ApiRepo } from './api.repo';

describe('Given ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getCharacters should be used', async () => {
      const repo = new ApiRepo();
      const expected: Character[] = [];
      const result = await repo.getCharacters();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When we instantiate it and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method getCharacters should be used', async () => {
      const repo = new ApiRepo();
      expect(repo.getCharacters()).rejects.toThrow();
    });

    test('Then method setCharacters should be used', async () => {
      const mockId = 1;
      const characterData = { id: 1 } as unknown as Partial<Character>;
      const expectedUrl = 'http://localhost:3000/characters/1';
      const repo = new ApiRepo();

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(characterData),
      });

      const response = await repo.setCharacter(mockId, characterData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'PATCH',
        body: JSON.stringify(characterData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(response).toEqual(characterData);
    });

    test('Then method setCharacters should be used', async () => {
      const mockId = 1;
      const characterData = { id: 1 } as unknown as Partial<Character>;
      const repo = new ApiRepo();

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(repo.setCharacter(mockId, characterData)).rejects.toThrow(
        '404 Not Found'
      );
    });
  });
});
