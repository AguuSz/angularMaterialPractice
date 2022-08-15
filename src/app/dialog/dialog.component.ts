import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
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
  }

  public addProduct(): void {
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
  }
}
