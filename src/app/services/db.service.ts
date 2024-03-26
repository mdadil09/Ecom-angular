import { Injectable } from '@angular/core';
import { doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CartServiceService } from './cart-service.service';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db?: any;
  constructor(private authService: AuthService, private router: Router) {
    this.db = getFirestore();
  }

  async createCart(product: any) {
    try {
      const uid = this.authService.getUid();

      const docRef = await addDoc(collection(this.db, 'products'), {
        ...product,
        by: uid,
      });
      console.log('Document written with ID: ', docRef);
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getAllProducts() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'products'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      result.push({ id: doc.id, ...doc.data() });
    });

    console.log(querySnapshot);

    return result;
  }
}
