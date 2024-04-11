import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  apiUrl: string='https://localhost:7132/api/Products'
  addProduct(data:any){

    let url = 'https://localhost:7132/api/Products/'
    return this.http.post<any>(url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  deleteProduct(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
