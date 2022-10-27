import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Get all the products
   */
  getProducts() {
    const endPoint = `${base_url}/products`;
    return this.http.get(endPoint);
  }

  /**
   * Save the products
   */
  saveProduct(body: any) {
    const endPoint = `${base_url}/products`;
    return this.http.post(endPoint, body);
  }

  /**
   * Edit product
   */
  updateProduct(body: any, id: any) {
    const endPoint = `${base_url}/products/${id}`;
    return this.http.put(endPoint, body);
  }
}
