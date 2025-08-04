import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {}

    apiUrl = 'http://localhost:3000';


    findAllProducts(): Observable<any> {
        return this.http.get(this.apiUrl + "/getCarsList");
    }

    findById(productId: string): Observable<any> {
        return this.http.get(this.apiUrl + "/cars/" + productId);
    }
}
