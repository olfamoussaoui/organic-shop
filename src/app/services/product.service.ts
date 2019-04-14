import { baseURL } from './../shared/baseurl';
import { Product } from './../shared/classes/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + 'products')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    getProduct(id: string): Observable<Product> {
      return this.http.get<Product>(baseURL + 'products/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    getFruitProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + 'products?category=fruits')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    getVegProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + 'products?category=vegetables')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    getNatHerbProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + 'products?category=natural herbs')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
