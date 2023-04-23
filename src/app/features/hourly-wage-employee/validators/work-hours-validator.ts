import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class WorkHoursValidator {
    static minhours(maxHours: number): ValidatorFn {
        return (control: AbstractControl<number>): ValidationErrors | null => {
            if (!control.value || !maxHours) {
                return null;
            }
            return control.value > maxHours ? { minhours: control.value } : null;
        }
    }

    static maxhours(minHours: number): ValidatorFn {
        return (control: AbstractControl<number>): ValidationErrors | null => {
            if (!control.value || !minHours) {
                return null;
            }
            return control.value < minHours ? { maxhours: control.value } : null;
        }
    }
}