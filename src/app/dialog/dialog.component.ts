import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../model/Product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  // Lista para loopear los radio-button y que quede mas limpio el HTML
  freshnessList = ['Brand new', 'Second hand', 'Refurbished'];
  productForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Product
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.actionButton = 'Edit';
    }
  }

  public addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.service.postProduct(this.productForm.value).subscribe({
          next: (response) => {
            alert('Product has been added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (error) => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  public updateProduct(): void {
    this.service
      .editProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Product updated sucessfully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (error) => {
          alert('There is been an error, please retry');
        },
      });
  }
}
