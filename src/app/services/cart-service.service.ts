import { Injectable } from '@angular/core';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartArr: any = [];

  cartLocalArr: any;

  constructor(private dbService: DbService) {}

  loadProductFromDb() {
    this.dbService
      .getAllProducts()
      .then((data: any) => {
        this.cartLocalArr = data;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
