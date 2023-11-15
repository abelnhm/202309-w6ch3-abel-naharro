export type Character = {
  id: number;
  isAlive: boolean;
  message: string;
  name: string;
  family: string;
  age: number;
  reignYears: number | null;
  weapon: 'string' | null;
  skillLevel: number | null;
  serveLevel: number;
  adviseTo: Character | null;
  servesTo: Character | null;
  category: 'king' | 'fighter' | 'adviser' | 'squire';
};
