import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class TimeValidator {
    static minhours(hours: number): ValidatorFn {
        return (control: AbstractControl<moment.Moment>): ValidationErrors | null => {
            if (!control.value || !hours) {
                return null;
            }
            return control.value.hours() < hours ? { 'minhour': control.value } : null;
        }
    }

    static maxhours(hours: number): ValidatorFn {
        return (control: AbstractControl<moment.Moment>): ValidationErrors | null => {
            if (!control.value || !hours) {
                return null;
            }
            return control.value.hours() > hours || control.value.hours() == hours && control.value.minutes() > 0 ? { maxhour: control.value } : null;
        }
    }

    static seconds(): ValidatorFn {
        return (control: AbstractControl<moment.Moment>): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            return control.value.seconds() !== 0 ? { seconds: control.value } : null;
        }
    }

    static minutes(): ValidatorFn {
        return (control: AbstractControl<moment.Moment>): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            return control.value.minutes() % 15 !== 0 ? { minutes: control.value } : null;
        }
    }

    static getMinDate() {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(8, 0, 0, 0);
        return date;
    }
}