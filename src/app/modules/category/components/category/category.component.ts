import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategotyService } from 'src/app/modules/shared/services/categoty.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategotyService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: String[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(){
    this.categoryService.getCategories()
      .subscribe( data => {
        console.log("Respuesta categories: " , data);
        this.processCategoriesResponse(data);

      }), ( (error: any) => {
        console.log("error: ", error)
      })

  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
    }
    this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
  }

}

export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
