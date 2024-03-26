import { Component } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { getTotalPrice } from '../../../config/config';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  num: Number = 5;

  constructor(public cartService: CartServiceService) {}

  ngOnInit() {
    this.cartService.loadProductFromDb();
  }

  removeFromCart(id: any) {
    const index = this.cartService.cartLocalArr.findIndex(
      (item: any) => item.product.id == id
    );
    if (index !== -1) {
      this.cartService.cartLocalArr.splice(index, 1);
    }
  }

  incrementQuantity(id: any) {
    const inc = this.cartService.cartLocalArr.find(
      (item: any) => item.product.id === id
    );
    if (inc) {
      inc.quantity += 1;
    }
  }

  decrementQuantity(id: any) {
    this.cartService.cartArr = this.cartService.cartLocalArr
      .map((item: any) => {
        if (item.product.id === id) {
          item.quantity--;
        }
        return item;
      })
      .filter((item: any) => item.quantity !== 0);
  }

  getPrice(item: any) {
    return getTotalPrice(item);
  }
}
