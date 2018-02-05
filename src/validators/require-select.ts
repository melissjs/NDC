import { FormControl } from '@angular/forms';
 
export class RequireSelectValidator {
 
    static isValid(control: FormControl): any {
 
        if (control.value === ''){
            return {
                "no selection": true
            };
        }
 
        return null;
    }
 
}