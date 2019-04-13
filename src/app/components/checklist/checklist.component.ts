import { Cart } from './../../shared/classes/cart';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  @LocalStorage('basket')
  shopping_basket: Cart[];
  constructor(private localSt: LocalStorageService) { }

  ngOnInit() {
    this.localSt.observe('basket').subscribe((response) => {
      console.log(response);
    });
  }
}
