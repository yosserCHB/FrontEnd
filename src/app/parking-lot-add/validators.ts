import { AbstractControl, ValidatorFn } from '@angular/forms';

export function capacityGreaterThanZero(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // If value is empty or null, don't perform validation
    }
    const parsedValue = parseInt(value, 10); // Parse the value as an integer
    if (isNaN(parsedValue) || parsedValue <= 0) {
      return { 'capacityGreaterThanZero': true }; // Validation fails if not a positive number
    }
    return null; // Validation passes
  };
}
