import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {
  product: Product;
  quantity = 1;
  isError = false;
  orderForm = { quantity: 1 };
  message = '';
  messageText = '';
  btnDisable = false;
  subscription = new Subscription();

  constructor(private appService: AppService, private  route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(paramsData => {
      if(paramsData.id){
        this.subscription.add(this.appService.productList.subscribe(data => {
          if(data.length == 0){
            this.router.navigate(['/']);
          }else{
            this.product = data[paramsData.id];
          }
        }, err => {
          console.error(err);
        }));
      }
      else{
        this.router.navigate['/'];
      }
    });

  }

  /**
   * Order product
   *
   * @memberof OrderProductComponent
   */
  order() {
    if(this.orderForm.quantity > 0){
      if(this.orderForm.quantity > this.product.availableQuantity){
        this.messageText = 'Only '+this.product.availableQuantity+' quantity available.'
      }
      else{
        this.btnDisable = true;
        let orderDetails = {
          productId: this.product.productId,
          quantity: this.orderForm.quantity
        }
        this.appService.orderProduct(orderDetails).subscribe(response => {
          if(response == true) {
            this.message = 'Success';
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
  }

  /**
   * Check entered quantity exceeding stock available
   *
   * @memberof OrderProductComponent
   */
  onChange() {
    if(this.orderForm.quantity > this.product.availableQuantity){
      this.messageText = 'Only '+this.product.availableQuantity+' quantity available.'
    }else{
      this.messageText = '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
