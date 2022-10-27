import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
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
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dateProduct.push(element);
      });

      //Set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Product add", "Good");
        this.getProduts();
      } else if (result == 2) {
        this.openSnackBar("Error saving product", "Error");
      }
    });
  }
  openSnackBar(msg: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(msg, action, {
      duration: 2000
    });
  }
  edit(id: number, name: string, price: number, amount: number, category: any) {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, amount: amount, category: category }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Product edited", "Good");
        this.getProduts();
      } else if (result == 2) {
        this.openSnackBar("Error editing product", "Error");
      }
    });
  }
  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: "product" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Product deleted", "Good");
        this.getProduts();
      } else if (result == 2) {
        this.openSnackBar("Error deleting product", "Error");
      }
    });
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

