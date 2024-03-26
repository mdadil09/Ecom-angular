import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private productService: ApiCallService) {}

  arr: any = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  // fetchProducts() {
  //   this.http.get('https://dummyjson.com/products').subscribe((item: any) => {
  //     this.arr = item.products;
  //     console.log(this.arr);
  //   });
  // }

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
}
