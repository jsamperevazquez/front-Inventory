import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  displayedColumns: String[] = ['id', 'name', 'price', 'amount', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProduts() {
    this.productService.getProducts()
      .subscribe((data: any) => {
        console.log("Products response", data);
        this.proccessProductResponse(data);
      }, (error: any) => {
        console.log("Products error", error);
      }
      )
  }

  proccessProductResponse(resp: any) {
    const dateProduct: ProductElement[] = []
    if (resp.metadata[0].code == "00") {
      let listProduct = resp.product.products;
      listProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }
  ngOnInit(): void {
    this.getProduts();
  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  amount: number;
  category: any;
  picture: any;
}
function proccessProductResponse(data: any) {
  throw new Error('Function not implemented.');
}

