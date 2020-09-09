import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Product } from '../../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productList: Product[] = [];
  subscriptions = new Subscription();
  isLoading = true;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getProuctList();
  }

  getProuctList(){
    this.subscriptions.add(this.appService.getProductList().subscribe((res: Product[]) => {
      this.productList = res;
      this.isLoading = false;
    }));
  }

}
