import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Subject, BehaviorSubject, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  productList = new BehaviorSubject<Product[]>([]);
  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(environment.apiUrl+'/api/Product').pipe(tap((response: Product[]) => {
      this.productList.next(response);
    }));
  }

  addProduct(product) {
    return this.http.post(environment.apiUrl+'/api/Product', product);
  }

  orderProduct(orderDetails) {
    return this.http.post(environment.apiUrl+'/api/OrderProducts', orderDetails);
  }
}
