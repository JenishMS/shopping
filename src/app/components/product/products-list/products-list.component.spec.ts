import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { AppService } from 'src/app/services/app.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { Product } from '../../../models/product.model';

const mockAppService = {
  getProductList: () => of([{
    productId: 1,
    productName: "mouse",
    availableQuantity: 50
  }, {
    productId: 2,
    productName: "Monitor",
    availableQuantity: 50
  }])
}


describe('ProductsListComponent: ', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AppService, useValue: mockAppService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product list', () => {
    component.getProuctList();
    expect(component.productList.length).toBe(2);
  })
});
