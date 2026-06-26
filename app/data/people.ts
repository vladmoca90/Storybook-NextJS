export interface Person {
  id: number;
  name: string;
  age: number;
  job: string;
  nationality: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
}

export const peopleData: Person[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    age: 28,
    job: 'Software Engineer',
    nationality: 'American',
    maritalStatus: 'married',
  },
  {
    id: 2,
    name: 'Liam O\'Brien',
    age: 35,
    job: 'Product Manager',
    nationality: 'Irish',
    maritalStatus: 'single',
  },
  {
    id: 3,
    name: 'Sofia Rodriguez',
    age: 31,
    job: 'UX Designer',
    nationality: 'Spanish',
    maritalStatus: 'married',
  },
  {
    id: 4,
    name: 'Yuki Tanaka',
    age: 26,
    job: 'Data Scientist',
    nationality: 'Japanese',
    maritalStatus: 'single',
  },
  {
    id: 5,
    name: 'Marie Dubois',
    age: 42,
    job: 'Project Lead',
    nationality: 'French',
    maritalStatus: 'divorced',
  },
];
