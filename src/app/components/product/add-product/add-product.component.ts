import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../../../models/custom-validator';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    availableQuantity: new FormControl('', [Validators.required, CustomValidator.numeric])
  });
  message = '';
  btnDisable = false;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  /**
   *Add product
   *
   * @memberof AddProductComponent
   */
  onSubmit() {
    if(this.addProductForm.valid) {
      this.btnDisable = true;
      this.addProductForm.value.availableQuantity = parseInt(this.addProductForm.value.availableQuantity);
      this.appService.addProduct(this.addProductForm.value).subscribe(response => {
        if(response === true){
          this.message = 'Success';
          this.addProductForm.reset();
          this.addProductForm.markAsUntouched();
          this.addProductForm.markAsPristine();
        }else{
          this.message = 'Failed';
        }
        this.btnDisable = false;
      }, err => {
        this.message = 'Failed';
        this.btnDisable = false;
      });
    }
  }

  /**
   * Validate reactive form field isValid
   *
   * @param {*} field
   * @returns {boolean}
   * @memberof AddProductComponent
   */
  validate(field): boolean{
    if(this.addProductForm.controls[field].invalid && (this.addProductForm.controls[field].dirty || this.addProductForm.controls[field].touched))
      return false;
    else
      return true;
  }

}
