import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {Product} from "@/types/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:3001/products';

    constructor(private http: HttpClient) { }

    getProductList(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}
