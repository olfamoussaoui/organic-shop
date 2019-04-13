import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ComponentsComponent } from './components.component';
import { ShopComponent } from './shop/shop.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        ShopComponent,
        AboutusComponent,
        ContactusComponent,
        ChecklistComponent,
        ProductDetailsComponent
    ],
    entryComponents: [],
    exports: [ ComponentsComponent ]
})
export class ComponentsModule { }
