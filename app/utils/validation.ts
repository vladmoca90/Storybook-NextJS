import { Person } from '@/app/data/people';

export const validatePerson = (person: Person): string[] => {
  const errors: string[] = [];

  if (!person.name || person.name.trim() === '') {
    errors.push('Name is required');
  }

  if (person.age < 18 || person.age > 100) {
    errors.push('Age must be between 18 and 100');
  }

  if (!person.job || person.job.trim() === '') {
    errors.push('Job is required');
  }

  if (!person.nationality || person.nationality.trim() === '') {
    errors.push('Nationality is required');
  }

  const validStatuses = ['single', 'married', 'divorced', 'widowed'];
  if (!validStatuses.includes(person.maritalStatus)) {
    errors.push('Invalid marital status');
  }

  return errors;
};

export const filterPeople = (
  people: Person[],
  filters: {
    searchName?: string;
    jobFilter?: string;
    nationalityFilter?: string;
    maritalStatusFilter?: string;
    ageRange?: [number, number];
  }
): Person[] => {
  return people.filter((person) => {
    if (filters.searchName && !person.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
      return false;
    }

    if (filters.jobFilter && person.job !== filters.jobFilter) {
      return false;
    }

    if (filters.nationalityFilter && person.nationality !== filters.nationalityFilter) {
      return false;
    }

    if (filters.maritalStatusFilter && person.maritalStatus !== filters.maritalStatusFilter) {
      return false;
    }

    if (filters.ageRange) {
      const [minAge, maxAge] = filters.ageRange;
      if (person.age < minAge || person.age > maxAge) {
        return false;
      }
    }

    return true;
  });
};
