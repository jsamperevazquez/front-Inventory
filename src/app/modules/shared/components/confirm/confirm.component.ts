import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategotyService } from '../../services/categoty.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any, private categoryService: CategotyService) { }

  ngOnInit(): void {
  }

  onNotClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){
      this.categoryService.deleteCategory(this.data.id).
        subscribe( (data:any) =>{
          this.dialogRef.close(1)
        }, (error: any) => {
      this.dialogRef.close(2);
    })
  }else {
    this.dialogRef.close(2);
  }
}
}
