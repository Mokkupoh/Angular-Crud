import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/products';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(this.apiUrl);
    }
    getbyId(id: number) {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }
    create(data: Product) {
        return this.http.post<Product>(this.apiUrl, data);
    }
    update(id: number, data: Product) {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
    }
    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
