import { Cart } from './../../shared/classes/cart';
import { ProductService } from './../../services/product.service';
import { Product } from './../../shared/classes/product';
import { Component, OnInit, Inject } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[];
  fruitProducts: Product[];
  vegProducts: Product[];
  natHerbProducts: Product[];
  isFruits: Boolean = false;
  isVeg: Boolean = false;
  isNatHerbs: Boolean = false;
  isAll: Boolean = true;
  errMess: string;
  _id: string;
  cart: Cart;
  keytot = 'keytot';
  constructor(private productService: ProductService,
    private localSt: LocalStorageService,
    @Inject('BaseURL') public BaseURL) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products,
      errmess => this.errMess = <any>errmess);
    this.productService.getFruitProducts().subscribe(fruitProducts => this.fruitProducts = fruitProducts,
      errmess => this.errMess = <any>errmess);
    this.productService.getVegProducts().subscribe(vegProducts => this.vegProducts = vegProducts,
      errmess => this.errMess = <any>errmess);
    this.productService.getNatHerbProducts().subscribe(natHerbProducts => this.natHerbProducts = natHerbProducts,
      errmess => this.errMess = <any>errmess);
  }
  showFruitProducts() {
    this.productService.getFruitProducts().subscribe(fruitProducts => this.fruitProducts = fruitProducts,
      errmess => this.errMess = <any>errmess);
    this.isFruits = true;
    this.isVeg = false;
    this.isAll = false;

  }

  showVegProducts() {
    this.productService.getVegProducts().subscribe(vegProducts => this.vegProducts = vegProducts,
      errmess => this.errMess = <any>errmess);
    this.isVeg = true;
    this.isFruits = false;
    this.isAll = false;
    this.isNatHerbs = false;
  }
  showNatHerbProducts() {
    this.productService.getVegProducts().subscribe(vegProducts => this.vegProducts = vegProducts,
      errmess => this.errMess = <any>errmess);
    this.isNatHerbs = true;
    this.isVeg = false;
    this.isFruits = false;
    this.isAll = false;
  }
  showAllProducts() {
    this.productService.getProducts().subscribe(products => this.products = products,
      errmess => this.errMess = <any>errmess);
    this.isNatHerbs = false;
    this.isVeg = false;
    this.isFruits = false;
    this.isAll = true;
  }

  saveLocal(p: Product) {
    const basket: Cart[] = this.localSt.retrieve('basket');
    let shopping_cart: Cart[] = [];
    let testCart: Cart = new Cart;
    let index;
    let nb;
    let total;
    let oldTotal;
    let subPrice;
    this.cart = new Cart;
    if (basket === null) {
      // add the first new product here
      this.cart.product = p;
      this.cart.quantity = 1;
      total = this.cart.product.price;
      shopping_cart.push(this.cart);
      this.localSt.store('basket', shopping_cart);
      this.localSt.store('keytot', 1);
      this.localSt.store('total', total);
    } else {
      // check if the product exist or not
      shopping_cart = [];
      index = basket.map(res => {
        return res.product.id;
      }).indexOf(p.id);
      console.log('index = ', index);
      if ( index >= 0 ) {
        console.log('item exist');
        // item exist
        shopping_cart = basket.filter(data => {
          return data.product.id !== p.id
        });
        testCart = basket.find( c => c.product.id === p.id);
        console.log(testCart);
        this.cart.product = p;
        this.cart.quantity = testCart.quantity + 1;
        subPrice = +this.cart.quantity * +this.cart.product.price;
        shopping_cart.push(this.cart);
        // Update Basket
        this.localSt.clear('basket');
        this.localSt.store('basket', shopping_cart);
        // Update keytot
        nb = this.localSt.retrieve('keytot');
        this.keytot = nb + 1;
        this.localSt.clear('keytot');
        this.localSt.store('keytot', this.keytot);
        // Update Total
        oldTotal = this.localSt.retrieve('total');
        total = (+oldTotal - (+testCart.quantity * +testCart.product.price)) + +subPrice;
        this.localSt.clear('total');
        this.localSt.store('total', total);
      } else {
        // item does not exist
        console.log('item does not exist')
        shopping_cart = basket;
        this.cart.product = p;
        this.cart.quantity = 1;
        shopping_cart.push(this.cart);
        // Update Basket
        this.localSt.clear('basket');
        this.localSt.store('basket', shopping_cart);
        // Update keytot
        nb = this.localSt.retrieve('keytot');
        this.keytot = nb + 1;
        this.localSt.clear('keytot');
        this.localSt.store('keytot', this.keytot);
        // Update Total
        oldTotal = this.localSt.retrieve('total');
        total = +oldTotal + +this.cart.product.price;
        this.localSt.store('total', total);
      }
    }
  }
  /* getPrice (p: Product): number {
    let price;
    if (p.promotion.isPromoted === true) {
      price = p.price - p.price * (p.promotion.pourcentage / 100);
      return price;
    } else {
      return p.price;
    }
  } */
}


