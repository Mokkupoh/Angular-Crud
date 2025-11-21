import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  product: Product;
  isCreateMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<Edit>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.product = { ...data };
    this.isCreateMode = !data || !data.id;
  }

  createProduct() {
    this.productService.create(this.product).subscribe(() => {
      this.dialogRef.close(this.product);
    });
  }

  updateProduct() {
    this.productService.update(this.product.id, this.product).subscribe(() => {
      this.dialogRef.close(this.product);
    });
  }

  cancelEdit() {
    this.dialogRef.close(null);
  }
}
