import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:8080/api/products';


    findAllProducts(): Observable<any> {
        return this.http.get(this.apiUrl + "/all");
    }

    findById(productId: string): Observable<any> {
        return this.http.get(this.apiUrl + "/" + productId);
    }
}
