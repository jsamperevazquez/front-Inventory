import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategotyService } from 'src/app/modules/shared/services/categoty.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  FormState: string;

  constructor(private fb: FormBuilder, private categoryService: CategotyService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.FormState = "Add";

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    if( data != null ){
      this.updateForm(data);
      this.FormState = "Update";
    }
  }

  ngOnInit(): void {
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    if(this.data != null ){
      //update register
      this.categoryService.updateCategory(data, this.data.id)
          .subscribe( (data: any) =>{
            this.dialogRef.close(1);
          }), (error: any ) =>{
            this.dialogRef.close(2);
          }
    }
    else {
      //Create new register
      this.categoryService.saveCategories(data)
      .subscribe( (data: any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }
}
