import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { lastValueFrom } from 'rxjs';
import { CartServiceService } from '../../services/cart-service.service';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private productService: ApiCallService,
    private cartService: CartServiceService,
    private dbService: DbService
  ) {}

  arr: any = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getPost().subscribe((data: any) => {
      this.arr = data.products;
      console.log(this.arr);
    });
  }

  getFirstLine = (text: string): string => {
    if (!text) return '';
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
  };

  getPriceAfterDiscount = (price: number, dis: number): string => {
    var p = price - price * (dis / 100);
    return p.toFixed(2);
  };

  addToCart(item: any, newItemId: any) {
    // return this.cartService.cartArr.push(item);

    const existingItem = this.cartService.cartArr.find(
      (item: any) => item.product.id === newItemId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.dbService.createCart({ product: item, quantity: 1 });
    }

    console.log(this.cartService.cartArr);
  }
}
