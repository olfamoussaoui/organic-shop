import { ProductService } from './../../services/product.service';
import { Cart } from './../../shared/classes/cart';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/shared/classes/product';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @LocalStorage('basket')
  shopping_basket: Cart[];
  @LocalStorage('total')
  subTotal: number;
  products: Product[];
  errMess: string;
  id: string;
  cart: Cart[] = [];
  testCart: Cart = new Cart();
  constructor(private localSt: LocalStorageService, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.localSt.observe('basket').subscribe((response) => {
      console.log(response);
    });
    this.toastr.overlayContainer = this.toastContainer;
  }
  removeStorage() {
    this.localSt.clear('basket');
    this.localSt.clear('keytot');
    this.localSt.clear('total');
  }
  removeItem(c: Cart) {
    const basket: Cart[] = this.localSt.retrieve('basket');
    let shopping_cart: Cart[] = [];
    let testCart: Cart = new Cart;
    let nb;
    let total;
    let oldTotal;
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
  }
}
