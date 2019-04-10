import { ProductService } from './../../services/product.service';
import { Product } from './../../shared/classes/product';
import { Component, OnInit, Inject } from '@angular/core';

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
  constructor(private productService: ProductService,
    @Inject('BaseURL') public BaseURL) { }

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

  saveLocal() {
  }
}
