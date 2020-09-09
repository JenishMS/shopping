import { AbstractControl } from '@angular/forms';
export class CustomValidator {

  static numeric(control: AbstractControl) {
    let value = control.value;
    if(value === null || value === '') return null;

    if(!value.toString().match(/^\d+$/))
      return { invalidNumber: true };

      return null;
  }

  static decimal(control: AbstractControl) {
    let value = control.value;
    if(value === null || value === '') return null;

    if(!value.toString().match(/\d+(\.\d{1,2})?/))
      return { invalidDecimal: true };

      return null;
  }

  static mobile(control: AbstractControl){
    let value = control.value;
    if(value === null || value === '') return null;

    if(!value.toString().match(/^[6-9]\d{9}$/))
      return { invalidNumber: true };

      return null;
  }
}
