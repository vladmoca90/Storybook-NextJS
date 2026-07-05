export type Country = {
  name: string;
  code: string;
  flag: string;
  capital: string;
  population: number;
};

export type PopulationFilter = 'all' | 'small' | 'medium' | 'large';

export type SortOption = 'name-asc' | 'name-desc' | 'population-desc' | 'population-asc';
