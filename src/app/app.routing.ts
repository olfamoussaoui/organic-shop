import { ContactusComponent } from './components/contactus/contactus.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopComponent } from './components/shop/shop.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ChecklistComponent } from './components/checklist/checklist.component';

const routes: Routes = [
    { path: 'home',             component: HomeComponent },
    { path: 'checklist',        component: ChecklistComponent },
    { path: 'productDetails',   component: ProductDetailsComponent},
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'shop',             component: ShopComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
