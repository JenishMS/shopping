import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './components/product/products-list/products-list.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { OrderProductComponent } from './components/order-product/order-product.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'order/:id',
    component: OrderProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
