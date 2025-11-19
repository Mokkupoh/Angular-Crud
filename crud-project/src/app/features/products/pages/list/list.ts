import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Edit } from '../../edit/edit';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  products: Product[] = [];

  constructor(private dialog: MatDialog,private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(Edit, {
      width: '300px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product) {
    this.openEditDialog(product); 
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
