import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: String = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public postProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/productList/`, data);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productList/`);
  }

  public editProduct(data: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/productList/` + id, data);
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/productList/` + id);
  }
}
