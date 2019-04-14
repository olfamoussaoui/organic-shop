import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { baseURL } from './shared/baseurl';
import { ProductService } from './services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    RouterModule.forRoot(
      [],
      {
        useHash: true,
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
        enableTracing: true,
        scrollPositionRestoration: 'enabled'
      }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    ProductService,
    ProcessHTTPMsgService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
