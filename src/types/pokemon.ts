export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
  baseStatTotal: number;
}

export interface ComparisonResult {
  id: 'higher' | 'lower' | 'equal';
  height: 'higher' | 'lower' | 'equal';
  weight: 'higher' | 'lower' | 'equal';
  baseStatTotal: 'higher' | 'lower' | 'equal';
  typesMatch: string[];     // 0, 1, 2
  abilitiesMatch: number; // how many abilities matched
}

export interface Guess {
  pokemon: Pokemon;
  comparison: ComparisonResult;
}
