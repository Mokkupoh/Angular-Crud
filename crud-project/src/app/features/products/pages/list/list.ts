import { CommonModule } from '@angular/common';
import { Component, viewChild, ViewChild } from '@angular/core';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Edit } from '../../edit/edit';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatSortModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'stock', 'actions'];
  products: Product[] = [];
  dataSource: MatTableDataSource<Product>;

  selectedCategory: string = '';
  categories: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private productService: ProductService) {
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  loadProducts() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.dataSource.data = this.products;
      this.categories = [...new Set(data.map((product) => product.category))];
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(Edit, {
      width: '350px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCategoryFilter() {
    if (!this.selectedCategory) {
      this.dataSource.data = this.products;
      return;
    }
    this.dataSource.data = this.products.filter(
      (product) => product.category === this.selectedCategory
    );
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
