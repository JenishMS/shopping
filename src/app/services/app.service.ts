import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Subject, BehaviorSubject, } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  productList = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get('/api/Product').pipe(tap((response: Product[]) => {
      this.productList.next(response);
    }));
  }

  addProduct(product) {
    return this.http.post('/api/Product', product);
  }

  orderProduct(orderDetails) {
    return this.http.post('/api/OrderProducts', orderDetails);
  }
}
