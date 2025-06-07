import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartitems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartitems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number {
    this.totalPrice = this.cartitems.reduce((sum, item) => sum + item.price, 0);
    return this.totalPrice;
  }

}
