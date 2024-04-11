import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductServiceService } from './product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProductManagement';
  products: any[] = [];
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';
  newProduct: any = {};
  dialogbox:boolean = false;
  productToDeleteId:any;
  searchTermDetail: string = '';
  searchTermPrice: string = '';
  searchTermDate: string = '';

  constructor(private http: HttpClient, private pService:ProductServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    debugger;
    let url = 'https://localhost:7132/api/Products/';
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    let url = 'https://localhost:7132/api/Products/GetAlldatefilterProducts';
    if (this.startDate && this.endDate) {
      url += `?startDate=${this.startDate}&endDate=${this.endDate}`;
    }
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error filtering products:', error);
      }
    );
  }
  addProduct(data:any){
    this.pService.addProduct(data).subscribe(Response => {
      this.newProduct = Response;
      this.getProducts();
    });


  }
  expenseForm:any;
  clearForm(): void {
   
    this.expenseForm.resetForm();
  }

  showDeleteConfirmation(id: number){
    this.dialogbox=true;
    this.productToDeleteId = id;
  }
  product:any;
  deleteProduct(){
    this.pService.deleteProduct(this.productToDeleteId).subscribe(Response => {
      this.product = Response;
      this.getProducts();
    });
  }
  canceldel(){
    this.dialogbox=false;
    this.getProducts();
  }

  toggleEditMode(product: any): void {
    product.isEditMode = !product.isEditMode;
  }
  
  saveChanges(product: any): void {
    const url = `https://localhost:7132/api/Products/${product.id}`;
    this.http.put<any>(url, product, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.getProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
    this.toggleEditMode(product);
  }
  
  cancelEdit(product: any): void {
    // Revert changes or reset form fields
    this.toggleEditMode(product);
  }
  
  updateProduct(product: any): void {
    const url = `https://localhost:7132/api/Products/${product.id}`;
    this.http.put<any>(url, product, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.getProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  filtersearchProducts(): void {
    this.products = this.products.filter(product => {
      return (
        (!this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (!this.searchTermDetail || product.detail.toLowerCase().includes(this.searchTermDetail.toLowerCase())) &&
        (!this.searchTermPrice || product.price.toString().includes(this.searchTermPrice)) &&
        (!this.searchTermDate || new Date(product.created_date).toLocaleDateString().includes(this.searchTermDate))
      );
    });
  }
  
}
