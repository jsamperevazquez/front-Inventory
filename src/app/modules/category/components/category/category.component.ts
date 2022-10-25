import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategotyService } from 'src/app/modules/shared/services/categoty.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategotyService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        console.log("Response categories: ", data);
        this.processCategoriesResponse(data);

      }), ((error: any) => {
        console.log("error: ", error)
      })

  }

  processCategoriesResponse(resp: any) {

    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
    } else {
      this.snackBar.open("Category not found", "Incorrect ID");
    }
    this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    this.dataSource.paginator = this.paginator;

  }

  openCategoryDialog(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Category add", "Good");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Error saving category", "Error");
      }
    });
  }

  edit(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data: { id: id, name: name, description: description },
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Category update", "Good");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Error updating category", "Error");
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: id },
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.openSnackBar("Category deleted", "Good");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Error deleting category", "Error");
      }
    });
  }

  search(data: string) {
    if (data.length === 0) {
      return this.getCategories();
    }
    this.categoryService.getCategoryById(data)
      .subscribe(resp => {
        this.processCategoriesResponse(resp);
      })
  }

  openSnackBar(msg: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(msg, action, {
      duration: 2000
    });
  }

}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
