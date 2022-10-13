import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategotyService {

  constructor(private http: HttpClient) { }

  /**
   * Get all categories
   * @returns categories
   */
  getCategories(){

    const endPoint = `${base_url}/categories`
    return this.http.get(endPoint);

  }

  /**
   * Save the categories
   */
  saveCategories(body: any){
    const endPoint = `${base_url}/categories`;
    return this.http.post(endPoint, body);
  }

  /**
   *  Update category
   */
  updateCategory(body: any, id: any){
    const endPoint = `${base_url}/categories/${id}`;
    return this.http.put(endPoint,body);
  }

  /**
   * Delete Category
   * @param body
   */
  deleteCategory(id: any){
    const endPoint = `${base_url}/categories/${id}`;
    return this.http.delete(endPoint);
  }

  /**
   *  Serch by ID
   */
  getCategoryById(id: any){
    const endPoint = `${base_url}/categories/${id}`;
    return this.http.get(endPoint);
  }
}

