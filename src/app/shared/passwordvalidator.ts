import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
    if (cpassword.pristine || password.pristine){
        return null;
    }
    return password && cpassword && password.value !== cpassword.value ?
    { misMatch: true } :
    null;
}
