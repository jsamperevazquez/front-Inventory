import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategotyService } from '../../shared/services/categoty.service';
import { ProductService } from '../../shared/services/product.service';

export interface Category {
  description: string;
  id: number;
  name: string;
}
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  formState: string = "";
  categories: Category[] = [];
  selectedFile: any;
  imageName: string = "";


  constructor(private fb: FormBuilder, private categoryService: CategotyService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formState = "Add";
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    })
    if (data != null) {
      this.updateForm(data);
      this.formState = "Update";
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onCancel() {
    this.dialogRef.close(3);
  }
  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      amount: this.productForm.get('amount')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }
    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('amount', data.amount);
    uploadImageData.append('categoryId', data.category);

    if (this.data != null) {
      //Update the product
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          console.log("Error updating product", error);
          this.dialogRef.close(2);
        })
    } else {
      //Call the service to save product
      this.productService.saveProduct(uploadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          console.log("Error saving new product", error);
          this.dialogRef.close(2);
        })
    }
  }
  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        this.categories = data.categoryResponse.category;
      }, (error: any) => {
        console.log("Error to consult category", error);
      })
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    this.imageName = event.target.files[0].name;
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      amount: [data.amount, Validators.required],
      category: [data.category.id, Validators.required],
      picture: ['', Validators.required]
    })
  }
}
