import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { Product } from './model/Product';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular Material Practice';
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'price',
    'freshness',
    'comment',
    'actions',
  ];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value === 'save') {
            this.getAllProducts();
          }
        },
      });
  }

  public getAllProducts(): void {
    this.service.getProducts().subscribe({
      next: (response: Product[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  public editProduct(product: Product): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: product,
      })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value === 'update') {
            this.getAllProducts();
          }
        },
      });
  }

  public deleteProduct(product: Product): void {
    this.service.deleteProduct(product.id).subscribe({
      next: (res) => {
        alert('Product has been deleted sucessfully');
        this.getAllProducts();
      },
      error: (err) => {
        alert('There is been an error, please retry');
      },
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
