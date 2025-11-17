import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    stock: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getbyId(id).subscribe((data) => {
      this.product = data;
    });
  }

  updateProduct() {
    this.productService.update(this.product.id, this.product).subscribe(() => {
      alert('Product updated successfully');
      this.router.navigate(['/products']);
    });
  }

  cancelEdit() {
    this.router.navigate(['/products']);
  }
}
