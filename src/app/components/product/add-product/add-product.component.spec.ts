import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from 'src/app/services/app.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const mockAppService = {
  getProductList: () => of([{
    productId: 1,
    productName: "mouse",
    availableQuantity: 50
  }, {
    productId: 2,
    productName: "Monitor",
    availableQuantity: 50
  }]),
  addProduct: () => of(true)
}

fdescribe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [RouterTestingModule,ReactiveFormsModule],
      providers: [{ provide: AppService, useValue: mockAppService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    appService = TestBed.get(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product return true', () => {
    component.addProductForm.setValue({productName: 'keyboard', availableQuantity: 44});
    component.onSubmit();
    expect(component.message).toBe('Success');
  });

  it('should add product return false', () => {
    const spyFn = spyOn(appService, 'addProduct').and.returnValue(of(false))
    component.addProductForm.setValue({productName: 'keyboard', availableQuantity: 44});
    component.onSubmit();
    expect(spyFn).toHaveBeenCalled();
    expect(component.message).toBe('Failed');
  });
  it('should add product return error', () => {
    const spyFn = spyOn(appService, 'addProduct').and.returnValue(throwError("Internal Server Error"))
    component.addProductForm.setValue({productName: 'keyboard', availableQuantity: 44});
    component.onSubmit();
    expect(spyFn).toHaveBeenCalled();
    expect(component.message).toBe('Failed');
  });

  it('should add product return error', () => {
    const spyFn = spyOn(appService, 'addProduct').and.returnValue(throwError("Internal Server Error"))
    component.addProductForm.setValue({productName: 'keyboard', availableQuantity: 44});
    component.onSubmit();
    expect(spyFn).toHaveBeenCalled();
    expect(component.message).toBe('Failed');
  });

  it('should check valid funtion return false', () => {
    component.addProductForm.setValue({productName: '', availableQuantity: 44});
    component.addProductForm.controls.productName.markAsTouched();
    component.addProductForm.controls.productName.markAsDirty();
    const returnvalue = component.validate('productName');
    expect(returnvalue).toBe(false);
  });

  it('should check valid funtion return true', () => {
    component.addProductForm.controls.productName.markAsTouched();
    component.addProductForm.setValue({productName: 'keyboard', availableQuantity: 44});
    component.addProductForm.controls.productName.markAsDirty();
    const returnvalue = component.validate('productName');
    expect(returnvalue).toBe(true);
  });

});
