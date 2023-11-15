import { Character } from '../model/characters';

export class ApiRepo {
  apiUrl = 'http://localhost:3000/characters';

  async getCharacters(): Promise<Character[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async setCharacter(
    id: Character['id'],
    setCharacter: Partial<Character>
  ): Promise<Character> {
    const finalUrl = `${this.apiUrl}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(setCharacter),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
