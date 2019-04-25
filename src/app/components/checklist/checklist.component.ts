import { ProductService } from './../../services/product.service';
import { Cart } from './../../shared/classes/cart';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/shared/classes/product';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})

export class ChecklistComponent implements OnInit {
  @LocalStorage('basket')
  shopping_basket: Cart[];
  @LocalStorage('total')
  subTotal: number;
  @LocalStorage('basketTot')
  basketTot: number;
  @LocalStorage('submitted')
  submitted: Boolean;
  products: Product[];
  errMess: string;
  id: string;
  cart: Cart[] = [];
  testCart: Cart = new Cart();
  constructor(private localSt: LocalStorageService, private productService: ProductService) { }

  ngOnInit() {
    this.localSt.observe('basket').subscribe((response) => {
      console.log(response);
    });
  }
  removeStorage() {
    this.localSt.clear('basket');
    this.localSt.clear('keytot');
    this.localSt.clear('total');
    this.localSt.clear('basketTot');
  }
  removeItem(c: Cart) {
    const basket: Cart[] = this.localSt.retrieve('basket');
    let shopping_cart: Cart[] = [];
    let testCart: Cart = new Cart;
    let nb;
    let total;
    let oldTotal;
    let oldTotBasket;
    let totBasket;
    testCart = basket.find( res => res.product.id === c.product.id);
    shopping_cart = basket.filter(data => {
      return data.product.id !== c.product.id
    });
    this.localSt.clear('basket');
    this.localSt.store('basket', shopping_cart);
    nb = this.localSt.retrieve('keytot');
    nb = nb - testCart.quantity;
    this.localSt.store('keytot', nb);
    // Update Total
    oldTotal = this.localSt.retrieve('total');
    total = oldTotal - (+testCart.product.price * +testCart.quantity);
    this.localSt.store('total', total);
    // Update Total Basket
    oldTotBasket = this.localSt.retrieve('basketTot');
    totBasket = total + 6;
    this.localSt.store('basketTot', totBasket);
  }
  addProd(c, q) {
    console.log(c);
    console.log(q);
    const basket: Cart[] = this.localSt.retrieve('basket');
    let shopping_cart: Cart[] = [];
    let testCart: Cart = new Cart;
    let nb;
    let total;
    let oldTotal;
    let oldTotBasket;
    let totBasket;
    testCart = basket.find( res => res.product.id === c.product.id);
    console.log('product found: ', testCart.quantity);
    nb = this.localSt.retrieve('keytot');
    console.log('nb total : ', nb);
    nb = nb - testCart.quantity;
    console.log('nv1 nb total : ', nb);
    oldTotal = this.localSt.retrieve('total');
    total = oldTotal - (+testCart.product.price * +testCart.quantity);
    console.log('subTotal', total);
    testCart.quantity = q;
    nb = nb + +q;
    console.log('nvFinal nb total : ', nb);
    this.localSt.store('keytot', nb);
    shopping_cart = basket.filter(data => {
      return data.product.id !== c.product.id
    });
    shopping_cart.push(testCart);
    this.localSt.clear('basket');
    this.localSt.store('basket', shopping_cart);
    // Update Total
    total = total + (+testCart.product.price * +q);
    this.localSt.store('total', total);
    // Update Total Basket
    oldTotBasket = this.localSt.retrieve('basketTot');
    totBasket = total + 6;
    this.localSt.store('basketTot', totBasket);
  }
}
